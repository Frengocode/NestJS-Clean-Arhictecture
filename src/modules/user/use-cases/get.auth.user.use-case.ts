import { IGetAuthUserUseCase } from '../interfaces/use-cases/iget.auth.user.use-case';
import {
  type IUserPasswordVerifier,
  USER_PASSWORD_VERIFIER,
} from '../interfaces/verifiers/iuser.password.verifier';
import { AuthUserRequestDTO } from '../dto/request/auth-user';
import { AuthUserDTO } from '../dto/responses/auth-user';
import { UserEntitie } from '../entities/user.entitie';
import {
  type IGetUserByUsernameVerifier,
  GET_USER_BY_USERNAME_VERIFIER,
} from '../interfaces/verifiers/iget.user.by.username.verifier';
import { Injectable, Inject } from '@nestjs/common';
import {
  defaultCacheTTL,
  getAuthUserCacheKey,
  getAuthUserRegistryCacheKey,
} from '../constants/constants';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class GetAuthUserUseCse implements IGetAuthUserUseCase {
  constructor(
    @Inject(USER_PASSWORD_VERIFIER)
    public passwordVerifier: IUserPasswordVerifier,

    @Inject(GET_USER_BY_USERNAME_VERIFIER)
    public getUserByUsernameVerifier: IGetUserByUsernameVerifier,

    @Inject()
    public cache: Cache,
  ) {}

  async execute(request: AuthUserRequestDTO): Promise<AuthUserDTO | never> {
    const key: string = getAuthUserCacheKey(request.username);
    const cachedData: AuthUserDTO | null | undefined =
      await this.cache.get<AuthUserDTO>(key);
    if (cachedData) {
      await this.passwordVerifier.verify(request.password, cachedData.password);
      console.log(cachedData);
      return cachedData;
    }

    const user: UserEntitie | never =
      await this.getUserByUsernameVerifier.getOr404(request.username);
    await this.passwordVerifier.verify(request.password, user.password);
    const [setKey, registry] = this.keyGenerator(request.username, user.id);
    const response: AuthUserDTO = AuthUserDTO.entitieMapper(user);
    await this.cacheSetter(setKey, registry, response);
    return response;
  }

  private keyGenerator(username: string, userID: number): [string, string] {
    return [getAuthUserCacheKey(username), getAuthUserRegistryCacheKey(userID)];
  }

  private async cacheSetter(
    key: string,
    registryKey: string,
    response: AuthUserDTO,
  ): Promise<void> {
    await this.cache.set(key, response, defaultCacheTTL);
    const registry: string[] =
      (await this.cache.get<string[]>(registryKey)) ?? [];
    if (!registry.includes(key)) {
      registry.push(key);
    }
    await this.cache.set(registryKey, registry, defaultCacheTTL);
  }
}
