import { AuthUserRequestDTO } from '../../dto/request/auth-user';
import { AuthUserDTO } from '../../dto/responses/auth-user';

export interface IGetAuthUserUseCase {
  execute(request: AuthUserRequestDTO): Promise<AuthUserDTO | never>;
}

export const GET_AUTH_USER_USE_CASE = Symbol('GET_AUTH_USER_USE_CASE');
