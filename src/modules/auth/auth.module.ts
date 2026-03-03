import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { TOKEN_GENERATOR } from './interfaces/auth/itoken.generator';
import { JwtTokenGenerator } from './infrastructure/auth/token/jwt.token.generator';
import { AUTH_LOGIN_USE_CASE } from './interfaces/use-cases/iauth.login';
import { AuthLoginUseCase } from './use-cases/auth.login.use-case';
import { Config } from 'src/common/config/config';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [
    { provide: TOKEN_GENERATOR, useClass: JwtTokenGenerator },
    { provide: AUTH_LOGIN_USE_CASE, useClass: AuthLoginUseCase },
  ],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const config = Config();

        return {
          secret: config.auth.jwtSecret,
          signOptions: {
            expiresIn: config.auth.expiresAt as StringValue,
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
