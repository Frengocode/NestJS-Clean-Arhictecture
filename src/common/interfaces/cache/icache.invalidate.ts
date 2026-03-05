/**
 * @summary Cache Invalidator
 */
export interface ICacheInvalidate {

  // Delete keys
  deleteKeys(keys: string[]): Promise<void>;

  // get real keys by their registryKey
  getRegistryKeys(registry: string): Promise<string[]>;
}

export const CACHE_INVALIDATE = Symbol('CACHE_INVALIDATE');
