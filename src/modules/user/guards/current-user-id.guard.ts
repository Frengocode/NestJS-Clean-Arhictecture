import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import type { Request } from 'express';
import { Config } from 'src/common/config/config';
import { IEnvConfig } from 'src/common/config/ienv.config';
import {
  type IGetUserUseCase,
  GET_USER_USE_CASE,
} from '../interfaces/use-cases/iget.user.use-case';
import { UserDTO } from '../dto/responses/user.dto';

export type AuthenticatedRequest = Request & {
  currentUser: UserDTO;
};

@Injectable()
export class CurrentUserGuard implements CanActivate {
  constructor(
    @Inject(GET_USER_USE_CASE)
    public getUserUseCase: IGetUserUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;
    const token = this._getToken(authorization);

    const config: IEnvConfig = Config();
    const payload = verify(token, config.auth.jwtSecret) as string | JwtPayload;
    if (typeof payload === 'string') {
      throw new UnauthorizedException('Invalid token payload');
    }
    const sub = payload.sub;
    const userId: number = Number(sub);
    const user: UserDTO | never = await this.getUserUseCase.execute(userId);

    request.currentUser = user;
    return true;
  }

  private _getToken(authorization: string | undefined): string {
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return token;
  }
}
