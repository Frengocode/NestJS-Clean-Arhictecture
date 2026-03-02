import { UserDTO } from '../dto/responses/user.dto';
import { IGetUserByUsernameUseCase } from '../interfaces/use-cases/iget.user.by.username.use-case';
import {
  type IGetUserByUsernameVerifier,
  GET_USER_BY_USERNAME_VERIFIER,
} from '../interfaces/verifiers/iget.user.by.username.verifier';
import { UserEntitie } from '../entities/user.entitie';
import { type ICache, CACHE } from 'src/common/interfaces/cache/icache';
import {
  defaultCacheTTL,
  getUserByUsernameCacheKey,
} from '../constants/constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByUsernameUseCase implements IGetUserByUsernameUseCase {
  constructor(
    @Inject(GET_USER_BY_USERNAME_VERIFIER)
    public getUserByUsernameVerifier: IGetUserByUsernameVerifier,

    @Inject(CACHE)
    public cache: ICache<UserDTO>,
  ) {}

  async execute(username: string): Promise<UserDTO | never> {
    const key: string = getUserByUsernameCacheKey(username);
    const mapper: UserDTO = new UserDTO();
    const cachedData: UserDTO | null = await this.cache.get(key, mapper);
    if (cachedData) {
      console.log(cachedData);
      return cachedData;
    }
    const user: UserEntitie | never =
      await this.getUserByUsernameVerifier.getOr404(username);
    const response: UserDTO = mapper.entitieMapper(user);
    await this.cache.set(key, defaultCacheTTL, response);
    return response;
  }
}
