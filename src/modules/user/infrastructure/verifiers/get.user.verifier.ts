import { IGetUserVerifier } from '../../interfaces/verifiers/iget.user.verifier';
import { UserNotFoundException } from '../../exceptions/exceptions';
import { Inject, Injectable } from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../interfaces/repository/iuser.repository';
import { UserEntitie } from '../../entities/user.entitie';

@Injectable()
export class GetUserVerifier implements IGetUserVerifier {
  constructor(
    @Inject(USER_REPOSITORY)
    public repository: IUserRepository,
  ) {}

  async getOr404(userID: number): Promise<UserEntitie | never> {
    const user: UserEntitie | null = await this.repository.getUserById(userID);
    if (!user) {
      throw UserNotFoundException();
    }
    return user;
  }
}
