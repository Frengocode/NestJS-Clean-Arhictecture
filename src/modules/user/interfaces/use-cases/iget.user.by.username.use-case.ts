import { UserDTO } from '../../dto/responses/user.dto';

export interface IGetUserByUsernameUseCase {
  execute(username: string): Promise<UserDTO | never>;
}

export const GET_USER_BY_USERNAME_USE_CASE = Symbol(
  'GET_USER_BY_USERNAME_USE_CASE',
);
