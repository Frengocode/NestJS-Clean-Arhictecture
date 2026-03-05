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
import { CacheGlobalModule } from 'src/common/cache/cache.module';
import { GET_USER_BY_USERNAME_VERIFIER } from './interfaces/verifiers/iget.user.by.username.verifier';
import { GetUserByUsernameVerifier } from './infrastructure/verifiers/get.user.by.username.verifier';
import { GET_USER_BY_USERNAME_USE_CASE } from './interfaces/use-cases/iget.user.by.username.use-case';
import { GetUserByUsernameUseCase } from './use-cases/get.user.by.username.use-case';
import { GET_AUTH_USER_USE_CASE } from './interfaces/use-cases/iget.auth.user.use-case';
import { GetAuthUserUseCse } from './use-cases/get.auth.user.use-case';
import { USER_PASSWORD_VERIFIER } from './interfaces/verifiers/iuser.password.verifier';
import { UserPasswordVerifier } from './infrastructure/verifiers/user.password.verifier';
import { GET_USERS_USE_CASE } from './interfaces/use-cases/iget.users.use-case';
import { GetUsersUseCase } from './use-cases/get.users.use-case';
import { GET_USERS_VERIFIER } from './interfaces/verifiers/iget.users.verifier';
import { GetUsersVerifier } from './infrastructure/verifiers/get.users.verifier';
import { UserEventsPublisher, USER_EVENTS_CLIENT } from './events/user.events';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IEnvConfig } from 'src/common/config/ienv.config';
import { Config } from 'src/common/config/config';
import { UPDATE_USER_VERIFIER } from './interfaces/verifiers/iupdate.user.verifier';
import { UpdateUserVerfier } from './infrastructure/verifiers/update.user.verifier';
import { UPDATE_USER_USE_CASE } from './interfaces/use-cases/iupdate.user.use-case';
import { UpdateUserUseCase } from './use-cases/update.user.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntitie]),
    CacheGlobalModule,
    ClientsModule.registerAsync([
      {
        name: USER_EVENTS_CLIENT,
        useFactory: () => {
          const config: IEnvConfig = Config();

          return {
            transport: Transport.RMQ,
            options: {
              urls: [config.rabbitMQ.url],
              exchange: config.rabbitMQ.exchange,
              exchangeType: 'fanout',
              queue: config.rabbitMQ.queue,
              persistent: true,
            },
          };
        },
      },
    ]),
  ],
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
    {
      provide: GET_USERS_VERIFIER,
      useClass: GetUsersVerifier,
    },
    {
      provide: GET_USERS_USE_CASE,
      useClass: GetUsersUseCase,
    },
    UserEventsPublisher,
    {
      provide: UPDATE_USER_VERIFIER,
      useClass: UpdateUserVerfier,
    },
    {
      provide: UPDATE_USER_USE_CASE,
      useClass: UpdateUserUseCase,
    },
  ],
  exports: [GET_AUTH_USER_USE_CASE, GET_USER_USE_CASE],
  controllers: [UserController],
})
export class UserModule {}

// Add rabbitmq
