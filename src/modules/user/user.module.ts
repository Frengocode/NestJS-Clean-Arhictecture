import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitie } from './entities/user.entitie';
import { USER_REPOSITORY } from './interfaces/repository/iuser.repository';
import { UserRepository } from './infrastructure/repository/user.repository';
import { EXIST_USER_VERIFIER } from './interfaces/verifiers/iexist.user.verifier';
import { ExistUserVerifier } from './infrastructure/verifiers/exists.user.verifier';
import { CREATE_USER_USE_CASE } from './interfaces/use-cases/icreate.user.use-case';
import { CreateUserUseCase } from './use-cases/create.user.use-case';
import { HASH } from './interfaces/hash/ihash';
import { BcryptHash } from './infrastructure/hash/bcrypt.hash';
import { GET_USER_VERIFIER } from './interfaces/verifiers/iget.user.verifier';
import { GET_USER_USE_CASE } from './interfaces/use-cases/iget.user.use-case';
import { GetUserVerifier } from './infrastructure/verifiers/get.user.verifier';
import { GetUserUseCase } from './use-cases/get.user.use-case';
import { RedisCacheModule } from 'src/common/cache/redis/redis.cache.module';
import { GET_USER_BY_USERNAME_VERIFIER } from './interfaces/verifiers/iget.user.by.username.verifier';
import { GetUserByUsernameVerifier } from './infrastructure/verifiers/get.user.by.username.verifier';
import { GET_USER_BY_USERNAME_USE_CASE } from './interfaces/use-cases/iget.user.by.username.use-case';
import { GetUserByUsernameUseCase } from './use-cases/get.user.by.username.use-case';
import { GET_AUTH_USER_USE_CASE } from './interfaces/use-cases/iget.auth.user.use-case';
import { GetAuthUserUseCse } from './use-cases/get.auth.user.use-case';
import { USER_PASSWORD_VERIFIER } from './interfaces/verifiers/iuser.password.verifier';
import { UserPasswordVerifier } from './infrastructure/verifiers/user.password.verifier';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitie]), RedisCacheModule],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: EXIST_USER_VERIFIER, useClass: ExistUserVerifier },
    { provide: CREATE_USER_USE_CASE, useClass: CreateUserUseCase },
    { provide: HASH, useClass: BcryptHash },
    { provide: GET_USER_VERIFIER, useClass: GetUserVerifier },
    { provide: GET_USER_USE_CASE, useClass: GetUserUseCase },
    {
      provide: GET_USER_BY_USERNAME_VERIFIER,
      useClass: GetUserByUsernameVerifier,
    },
    {
      provide: GET_USER_BY_USERNAME_USE_CASE,
      useClass: GetUserByUsernameUseCase,
    },
    {
      provide: USER_PASSWORD_VERIFIER,
      useClass: UserPasswordVerifier,
    },
    {
      provide: GET_AUTH_USER_USE_CASE,
      useClass: GetAuthUserUseCse,
    },
  ],
  exports: [GET_AUTH_USER_USE_CASE, GET_USER_USE_CASE],
  controllers: [UserController],
})
export class UserModule {}
