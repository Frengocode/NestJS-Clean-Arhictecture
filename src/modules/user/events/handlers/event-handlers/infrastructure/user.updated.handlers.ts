import {
  type ICacheInvalidate,
  CACHE_INVALIDATE,
} from 'src/common/interfaces/cache/icache.invalidate';
import { Injectable, Inject } from '@nestjs/common';
import { UserDTO } from 'src/modules/user/dto/responses/user.dto';
import {
  getUserByUsernameRegistryCacheKey,
  getUsersRegistryCacheKey,
  getAuthUserRegistryCacheKey,
  getAuthUserCacheKey,
  getUserByIdCacheKey,
} from 'src/modules/user/constants/constants';
import { IUserUpdateHandler } from '../interfaces/iuser.updated.handler';

@Injectable()
export class UserUpdatedHandler implements IUserUpdateHandler {
  constructor(
    @Inject(CACHE_INVALIDATE)
    private readonly cacheInvalidate: ICacheInvalidate,
  ) {}

  async handleEvent(payload: UserDTO): Promise<void> {
    const keysToDelete: string[] = await this.collectKeys(payload);
    await this.cacheInvalidate.deleteKeys(keysToDelete);
  }

  private async collectKeys(payload: UserDTO): Promise<string[]> {
    const userByUsernameRegistryKey: string = getUserByUsernameRegistryCacheKey(
      payload.id,
    );
    const usersRegistryKey: string = getUsersRegistryCacheKey();
    const authRegistryKey: string = getAuthUserRegistryCacheKey(payload.id);

    const [userByUsernameKeys, usersKeys, authKeys] = await Promise.all([
      this.cacheInvalidate.getRegistryKeys(userByUsernameRegistryKey),
      this.cacheInvalidate.getRegistryKeys(usersRegistryKey),
      this.cacheInvalidate.getRegistryKeys(authRegistryKey),
    ]);
    return [
      getUserByIdCacheKey(payload.id),
      getAuthUserCacheKey(payload.username),
      userByUsernameRegistryKey,
      usersRegistryKey,
      authRegistryKey,
      ...userByUsernameKeys,
      ...usersKeys,
      ...authKeys,
    ];
  }
}
