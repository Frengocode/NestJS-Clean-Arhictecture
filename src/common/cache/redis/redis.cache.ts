import { Inject, Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { BaseDTO } from 'src/common/dto/base.dto';
import { ICache } from 'src/common/interfaces/cache/icache';

@Injectable()
export class RedisCache<T> implements ICache<T> {
  constructor(
    @Inject('REDIS_CLIENT')
    public redis: RedisClientType,
  ) {}

  async set(key: string, ttl: number, value: BaseDTO<T>): Promise<void> {
    const jsonValue: string = JSON.stringify(value);
    await this.redis.set(key, jsonValue, { EX: ttl });
  }

  async get(key: string, dto: BaseDTO<T>): Promise<T | null> {
    const cache: string | null = await this.redis.get(key);
    if (!cache) {
      return null;
    }

    return dto.parseJson(cache);
  }
}
