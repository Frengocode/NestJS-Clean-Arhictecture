import { AuthUserRequestDTO } from 'src/modules/user/dto/request/auth-user';
import { LoginDTO } from '../../dto/response/login.dto';

export interface IAuthLoginUseCase {
  execute(request: AuthUserRequestDTO): Promise<LoginDTO | never>;
}

export const AUTH_LOGIN_USE_CASE = Symbol('AUTH_LOGIN_USE_CASE');
