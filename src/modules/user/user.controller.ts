import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/request/create-user';
import {
  type ICreateUserUseCase,
  CREATE_USER_USE_CASE,
} from './interfaces/use-cases/icreate.user.use-case';
import { Inject } from '@nestjs/common';
import { UserDTO } from './dto/responses/user.dto';
import { ApiResponse } from '@nestjs/swagger';
import {
  type IGetUserUseCase,
  GET_USER_USE_CASE,
} from './interfaces/use-cases/iget.user.use-case';

import {
  type IGetUserByUsernameUseCase,
  GET_USER_BY_USERNAME_USE_CASE,
} from './interfaces/use-cases/iget.user.by.username.use-case';
import {
  type IGetAuthUserUseCase,
  GET_AUTH_USER_USE_CASE,
} from './interfaces/use-cases/iget.auth.user.use-case';
import { AuthUserRequestDTO } from './dto/request/auth-user';
import { AuthUserDTO } from './dto/responses/auth-user';

@Controller('users/api/v1')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    public createUserUseCase: ICreateUserUseCase,

    @Inject(GET_USER_USE_CASE)
    public getUserUseCase: IGetUserUseCase,

    @Inject(GET_USER_BY_USERNAME_USE_CASE)
    public getUserByUsernameUseCase: IGetUserByUsernameUseCase,

    @Inject(GET_AUTH_USER_USE_CASE)
    public getAuthUserUseCase: IGetAuthUserUseCase,
  ) {}

  @Post('/create/user')
  @ApiResponse({ type: UserDTO })
  async createUser(@Body() dto: CreateUserDTO): Promise<UserDTO | never> {
    return await this.createUserUseCase.execute(dto);
  }

  @Get('/get/user/:userID')
  @ApiResponse({
    type: UserDTO,
  })
  async getUser(
    @Param('userID', ParseIntPipe) userID: number,
  ): Promise<UserDTO | never> {
    return await this.getUserUseCase.execute(userID);
  }

  @Get('/get/user/by/username/:username')
  @ApiResponse({ type: UserDTO })
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDTO | never> {
    return await this.getUserByUsernameUseCase.execute(username);
  }

  @Get('/get/auth/user')
  @ApiResponse({
    type: AuthUserDTO,
  })
  async getAuthUser(
    @Query() request: AuthUserRequestDTO,
  ): Promise<AuthUserDTO | never> {
    return this.getAuthUserUseCase.execute(request);
  }
}


// TODO FOR TOMOROW: GetCurrentUser, AuthService, UpdateUser, PostService WITH DDD