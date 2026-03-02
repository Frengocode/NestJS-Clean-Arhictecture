import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../interfaces/repository/iuser.repository';
import { IGetUserByUsernameVerifier } from '../../interfaces/verifiers/iget.user.by.username.verifier';
import { UserEntitie } from '../../entities/user.entitie';
import { UserNotFoundException } from '../../exceptions/exceptions';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByUsernameVerifier implements IGetUserByUsernameVerifier {
  constructor(
    @Inject(USER_REPOSITORY)
    public repository: IUserRepository,
  ) {}

  async getOr404(username: string): Promise<UserEntitie | never> {
    const user: UserEntitie | null =
      await this.repository.getUserByUsername(username);
    if (!user) {
      throw UserNotFoundException();
    }
    return user;
  }
}
