import { IGetUserUseCase } from '../interfaces/use-cases/iget.user.use-case';
import {
  type IGetUserVerifier,
  GET_USER_VERIFIER,
} from '../interfaces/verifiers/iget.user.verifier';
import { UserDTO } from '../dto/responses/user.dto';
import { type ICache, CACHE } from 'src/common/interfaces/cache/icache';
import { Inject, Injectable } from '@nestjs/common';
import { defaultCacheTTL, getUserByIdCacheKey } from '../constants/constants';
import { UserEntitie } from '../entities/user.entitie';

@Injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @Inject(GET_USER_VERIFIER)
    public getUserVerifier: IGetUserVerifier,

    @Inject(CACHE)
    public cache: ICache<UserDTO>,
  ) {}
  async execute(userID: number): Promise<UserDTO | never> {
    const key: string = getUserByIdCacheKey(userID);
    const mapper: UserDTO = new UserDTO();
    const cachedData: UserDTO | null = await this.cache.get(key, mapper);
    if (cachedData) {
      console.log(cachedData);
      return cachedData;
    }
    const user: UserEntitie | never =
      await this.getUserVerifier.getOr404(userID);

    const response: UserDTO = mapper.entitieMapper(user);
    await this.cache.set(key, defaultCacheTTL, response);
    return response;
  }
}
