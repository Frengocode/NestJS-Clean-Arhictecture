export interface IUserCreatedHandler {
  handleEvent(): Promise<void>;
}

export const USER_CREATED_HANDLER = Symbol('USER_CREATED_HANDLER');
