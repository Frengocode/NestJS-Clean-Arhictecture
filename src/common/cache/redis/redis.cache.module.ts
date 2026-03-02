import { Module } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';
import { Config } from 'src/common/config/config';
import { RedisCache } from './redis.cache';
import { CACHE } from 'src/common/interfaces/cache/icache';

@Module({
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
  ],
  exports: ['REDIS_CLIENT', CACHE],
})
export class RedisCacheModule {}
