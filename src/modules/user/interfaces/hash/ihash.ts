export interface IHash {
  /**
   * @summary Hashes value
   * @param value
   */
  hash(value: string, saltRounds: number): Promise<string>;

  /**
   * @summary Compare secret and hash matching
   * @param secret
   * @param hash
   */
  compare(secret: string, hash: string): Promise<boolean>;
}

export const HASH = Symbol('HASH');
