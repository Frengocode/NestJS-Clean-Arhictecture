import { UserEntitie } from '../../entities/user.entitie';
import { Inject, Injectable } from '@nestjs/common';
import { IExistUserVerifier } from '../../interfaces/verifiers/iexist.user.verifier';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../interfaces/repository/iuser.repository';
import { ExistUserException } from '../../exceptions/exceptions';

@Injectable()
export class ExistUserVerifier implements IExistUserVerifier {
  constructor(
    @Inject(USER_REPOSITORY)
    public repository: IUserRepository,
  ) {}

  async verifyExistUser(username: string): Promise<never | void> {
    const user: UserEntitie | null =
      await this.repository.getUserByUsername(username);
    if (user) {
      throw ExistUserException();
    }
  }
}
