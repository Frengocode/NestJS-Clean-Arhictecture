export const getUserByIdCacheKey = (userID: number): string =>
  `user.${userID}.get`;

export const getUserByUsernameCacheKey = (username: string): string =>
  `user.${username}.get`;

export const getAuthUserCacheKey = (username: string): string => 
  `auth.${username}.user.get`

export const defaultCacheTTL: number = 300;
