import { UserDTO } from '../../dto/responses/user.dto';

export interface IGetUserUseCase {
  execute(userID: number): Promise<UserDTO | never>;
}

export const GET_USER_USE_CASE = Symbol('GET_USER_USE_CASE');
