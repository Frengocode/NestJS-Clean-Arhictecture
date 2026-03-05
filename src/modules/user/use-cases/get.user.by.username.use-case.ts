import { UserDTO } from '../dto/responses/user.dto';
import { IGetUserByUsernameUseCase } from '../interfaces/use-cases/iget.user.by.username.use-case';
import {
  type IGetUserByUsernameVerifier,
  GET_USER_BY_USERNAME_VERIFIER,
} from '../interfaces/verifiers/iget.user.by.username.verifier';
import { UserEntitie } from '../entities/user.entitie';
import {
  defaultCacheTTL,
  getUserByUsernameCacheKey,
  getUserByUsernameRegistryCacheKey,
} from '../constants/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class GetUserByUsernameUseCase implements IGetUserByUsernameUseCase {
  constructor(
    @Inject(GET_USER_BY_USERNAME_VERIFIER)
    public getUserByUsernameVerifier: IGetUserByUsernameVerifier,

    @Inject()
    public cache: Cache,
  ) {}

  /**
   * @summary Get's user by username
   * @param username
   * @returns
   */
  async execute(username: string): Promise<UserDTO> {
    const key: string = getUserByUsernameCacheKey(username);

    // Get's cache if exists
    const cachedData: UserDTO | null | undefined = await this.cache.get(key);
    if (cachedData) {
      console.log('[ GetUserByUsername ] Data from cache', cachedData);
      return cachedData;
    }

    // Get's user or throws HTTPException.NOT_FOUND
    const user: UserEntitie =
      await this.getUserByUsernameVerifier.getOr404(username);
    const response: UserDTO = UserDTO.entitieMapper(user);

    // Key's for set data into cache
    const [setKey, registry] = this.keyGenerator(username, user.id);
    await this.cacheSetter(setKey, registry, response);

    return response;
  }

  private keyGenerator(username: string, userID: number): [string, string] {
    return [
      getUserByUsernameCacheKey(username),
      getUserByUsernameRegistryCacheKey(userID),
    ];
  }

  private async cacheSetter(
    key: string,
    registryKey: string,
    response: UserDTO,
  ): Promise<void> {
    await this.cache.set(key, response, defaultCacheTTL);
    await this.cache.set(registryKey, key, defaultCacheTTL);
  }
}
