import { Controller, Inject, Post, Body } from '@nestjs/common';
import { type IAuthLoginUseCase, AUTH_LOGIN_USE_CASE } from './interfaces/use-cases/iauth.login';
import { AuthUserRequestDTO } from '../user/dto/request/auth-user';
import { ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/response/login.dto';

@Controller('/auth/api/v1')
export class AuthController {
    constructor(
        @Inject(AUTH_LOGIN_USE_CASE)
        public authLoginUseCase: IAuthLoginUseCase
    ){}

    @Post("/login")
    @ApiResponse({type: LoginDTO})
    async authLogin(@Body() request: AuthUserRequestDTO): Promise<LoginDTO | never>{
        return await this.authLoginUseCase.execute(request)
    }
}
