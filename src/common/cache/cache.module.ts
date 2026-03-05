import { Module } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';
import { RedisCache } from './infrastructure/redis.cache';
import { CACHE } from 'src/common/interfaces/cache/icache';
import { CacheModule, CacheOptions } from '@nestjs/cache-manager';
import { Config } from 'src/common/config/config';
import { IEnvConfig } from 'src/common/config/ienv.config';
import KeyvRedis from '@keyv/redis';
import { CACHE_INVALIDATE } from 'src/common/interfaces/cache/icache.invalidate';
import { CacheInvalidate } from './infrastructure/cache.invalidate';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (): Promise<CacheOptions> => {
        const config: IEnvConfig = Config();

        return {
          ttl: config.redis.defaultCacheTTL,
          stores: [
            new KeyvRedis(`redis://${config.redis.host}:${config.redis.port}`),
          ],
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (): Promise<RedisClientType> => {
        const config = Config();

        const redisClient: RedisClientType = createClient({
          socket: {
            host: config.redis.host,
            port: config.redis.port,
          },
        });

        await redisClient.connect();
        return redisClient;
      },
    },
    {
      provide: CACHE,
      useClass: RedisCache,
    },
    {
      provide: CACHE_INVALIDATE,
      useClass: CacheInvalidate,
    },
  ],
  exports: ['REDIS_CLIENT', CACHE, CACHE_INVALIDATE],
})
export class CacheGlobalModule {}
