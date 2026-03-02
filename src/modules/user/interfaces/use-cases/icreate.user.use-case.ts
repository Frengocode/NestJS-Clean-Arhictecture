import { CreateUserDTO } from '../../dto/request/create-user';
import { UserDTO } from '../../dto/responses/user.dto';

export interface ICreateUserUseCase {
  execute(dto: CreateUserDTO): Promise<UserDTO | never>;
}

export const CREATE_USER_USE_CASE = Symbol('CREATE_USER_USE_CASE');
