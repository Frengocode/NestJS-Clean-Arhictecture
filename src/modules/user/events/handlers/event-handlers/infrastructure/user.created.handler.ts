import { IUserCreatedHandler } from '../interfaces/iuser.created.handler';
import {
  type ICacheInvalidate,
  CACHE_INVALIDATE,
} from 'src/common/interfaces/cache/icache.invalidate';
import { Injectable, Inject } from '@nestjs/common';
import { getUsersRegistryCacheKey } from 'src/modules/user/constants/constants';

@Injectable()
export class UserCreatedHandler implements IUserCreatedHandler {
  constructor(
    @Inject(CACHE_INVALIDATE)
    private readonly cacheInvalidate: ICacheInvalidate,
  ) {}

  async handleEvent(): Promise<void> {
    const usersRegistryKey: string = getUsersRegistryCacheKey();
    const usersKeys: string[] =
      await this.cacheInvalidate.getRegistryKeys(usersRegistryKey);

    const keysToDelete: string[] = [usersRegistryKey, ...usersKeys];
    console.log('[UserCreated] deleting cache', keysToDelete);
    await this.cacheInvalidate.deleteKeys(keysToDelete);
  }
}
