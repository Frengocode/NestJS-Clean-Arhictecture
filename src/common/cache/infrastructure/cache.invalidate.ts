import { ICacheInvalidate } from 'src/common/interfaces/cache/icache.invalidate';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import type { RedisClientType } from 'redis';

@Injectable()
export class CacheInvalidate implements ICacheInvalidate {
  constructor(
    @Inject()
    private readonly cache: Cache,

    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  async deleteKeys(keys: string[]): Promise<void> {
    const uniqueKeys: string[] = Array.from(new Set(keys));
    await Promise.all(
      uniqueKeys.map(async (key) => {
        // Delete from cache-manager store (Keyv namespace).
        await this.cache.del(key);

        // Delete raw Redis key for values written via custom RedisCache.
        await this.redis.del([key, `keyv:${key}`]);
      }),
    );
  }

  async getRegistryKeys(registryKey: string): Promise<string[]> {
    const registry: string[] | string | undefined = await this.cache.get<
      string[] | string
    >(registryKey);

    if (!registry) {
      return [];
    }

    if (Array.isArray(registry)) {
      return registry;
    }

    // Backward compatibility for old registry format.
    return [registry];
  }
}
