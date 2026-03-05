import { AuthUserDTO } from 'src/modules/user/dto/responses/auth-user';
import { AuthUserRequestDTO } from 'src/modules/user/dto/request/auth-user';
import { IAuthLoginUseCase } from '../interfaces/use-cases/iauth.login';
import {
  type IGetAuthUserUseCase,
  GET_AUTH_USER_USE_CASE,
} from 'src/modules/user/interfaces/use-cases/iget.auth.user.use-case';
import {
  type ITokenGenerator,
  TOKEN_GENERATOR,
} from '../interfaces/auth/itoken.generator';
import { Injectable, Inject } from '@nestjs/common';
import { LoginDTO } from '../dto/response/login.dto';
import { Payload } from '../types/payload';

@Injectable()
export class AuthLoginUseCase implements IAuthLoginUseCase {
  constructor(
    @Inject(TOKEN_GENERATOR)
    public tokenGenerator: ITokenGenerator,

    @Inject(GET_AUTH_USER_USE_CASE)
    public getAuthUserUseCase: IGetAuthUserUseCase,
  ) {}

  async execute(request: AuthUserRequestDTO): Promise<LoginDTO | never> {
    const user: AuthUserDTO | never =
      await this.getAuthUserUseCase.execute(request);
    const payload: Payload = { sub: user.id };
    const generatedToken: string = await this.tokenGenerator.generator(payload);
    return LoginDTO.mapper(generatedToken);
  }
}
