import { BaseDTO } from 'src/common/dto/base.dto';

export interface ICache<T> {
  /**
   * @summary Set value into cache collector
   * @param key
   * @param value
   */
  set(key: string, ttl: number, value: BaseDTO<T>): Promise<void>;

  /**
   * @summary Returns BaseDTO<T> | BaseDTO<T>[] or even null
   * @param key
   */
  get(key: string, dto: BaseDTO<T>): Promise<T | null>;
}

export const CACHE = Symbol('Cache');
