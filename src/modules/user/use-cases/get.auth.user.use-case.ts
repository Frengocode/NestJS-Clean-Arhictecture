import { IGetAuthUserUseCase } from '../interfaces/use-cases/iget.auth.user.use-case';
import {
  type IUserPasswordVerifier,
  USER_PASSWORD_VERIFIER,
} from '../interfaces/verifiers/iuser.password.verifier';
import { type ICache, CACHE } from 'src/common/interfaces/cache/icache';
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
} from '../constants/constants';

@Injectable()
export class GetAuthUserUseCse implements IGetAuthUserUseCase {
  constructor(
    @Inject(USER_PASSWORD_VERIFIER)
    public passwordVerifier: IUserPasswordVerifier,

    @Inject(GET_USER_BY_USERNAME_VERIFIER)
    public getUserByUsernameVerifier: IGetUserByUsernameVerifier,

    @Inject(CACHE)
    public cache: ICache<AuthUserDTO>,
  ) {}

  async execute(request: AuthUserRequestDTO): Promise<AuthUserDTO | never> {
    const key: string = getAuthUserCacheKey(request.username);
    const mapper: AuthUserDTO = new AuthUserDTO();
    const cachedData: AuthUserDTO | null = await this.cache.get(key, mapper);
    if (cachedData) {
      await this.passwordVerifier.verify(request.password, cachedData.password);
      console.log(cachedData)
      return cachedData;
    }

    const user: UserEntitie | never =
      await this.getUserByUsernameVerifier.getOr404(request.username);
    await this.passwordVerifier.verify(request.password, user.password);
    const response: AuthUserDTO = mapper.entitieMapper(user);
    await this.cache.set(key, defaultCacheTTL, response);
    return response;
  }
}
