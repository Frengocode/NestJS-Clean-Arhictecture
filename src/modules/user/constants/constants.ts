export const getUserByIdCacheKey = (userID: number): string =>
  `user.${userID}.get`;

export const getUserByUsernameCacheKey = (username: string): string =>
  `user.${username}.get.by.username`;

export const getAuthUserCacheKey = (username: string): string =>
  `auth.${username}.user.get`;

export const getUsersRegistryCacheKey = (): string => `get.users.key`;

export const getUsersCacheKey = (page: number, take: number): string => {
  return `get.${page}.${take}.users`;
};

export const getUserByUsernameRegistryCacheKey = (userID: number): string => {
  return `get.${userID}.user.by.username.key`;
};

export const getAuthUserRegistryCacheKey = (userID: number): string => {
  return `get.${userID}.auth.user.key`;
};

export const defaultCacheTTL: number = 3000000;

// Events
export const userCreatedEvent: string = 'user.created';
export const userUpdatedEvent: string = 'user.updated';
