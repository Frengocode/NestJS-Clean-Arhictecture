import { UpdateUserDTO } from '../../dto/request/update-user';
import { UserDTO } from '../../dto/responses/user.dto';

export interface IUpdateUserUseCase {
  execute(dto: UpdateUserDTO, currentUserID: number): Promise<UserDTO | never>;
}

export const UPDATE_USER_USE_CASE = Symbol('UPDATE_USER_USE_CASE');
