import { PaginationDTO } from 'src/common/pagination/pagination.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IGetUsersUseCase } from '../interfaces/use-cases/iget.users.use-case';
import {
  type IGetUsersVerifier,
  GET_USERS_VERIFIER,
} from '../interfaces/verifiers/iget.users.verifier';
import { UserDTO } from '../dto/responses/user.dto';
import { UserEntitie } from '../entities/user.entitie';
import {
  defaultCacheTTL,
  getUsersCacheKey,
  getUsersRegistryCacheKey,
} from '../constants/constants';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @Inject(GET_USERS_VERIFIER)
    public getUsersVerifyer: IGetUsersVerifier,

    @Inject()
    public cache: Cache,
  ) {}

  async execute(
    pagination: PaginationDTO,
  ): Promise<UserDTO[] | unknown | never> {
    const [key, registryKey] = this._KeyGenerator(pagination);
    const cachedData = await this.cache.get(key);
    if (cachedData) {
      console.log(cachedData);
      return cachedData;
    }

    const users: UserEntitie[] | never =
      await this.getUsersVerifyer.getOr404(pagination);
    console.log('USERS', users);
    const response: UserDTO[] = UserDTO.listMapper(users);
    await this._cacheSetter(key, registryKey, response);
    return response;
  }

  private async _cacheSetter(
    key: string,
    registryKey: string,
    response: UserDTO[],
  ): Promise<void> {
    await this.cache.set(key, response, defaultCacheTTL);

    const registry: string[] =
      (await this.cache.get<string[]>(registryKey)) ?? [];
    if (!registry.includes(key)) {
      registry.push(key);
    }

    await this.cache.set(registryKey, registry, defaultCacheTTL);
  }

  private _KeyGenerator(pagination: PaginationDTO): [string, string] {
    const key: string = getUsersCacheKey(pagination.page, pagination.take);
    const registryKey: string = getUsersRegistryCacheKey();
    return [key, registryKey];
  }
}
