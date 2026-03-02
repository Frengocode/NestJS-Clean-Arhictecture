import { IUserPasswordVerifier } from '../../interfaces/verifiers/iuser.password.verifier';
import { UserEntitie } from '../../entities/user.entitie';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../interfaces/repository/iuser.repository';
import { Inject, Injectable } from '@nestjs/common';
import { type IHash, HASH } from '../../interfaces/hash/ihash';
import { InValidDataException } from '../../exceptions/exceptions';

@Injectable()
export class UserPasswordVerifier implements IUserPasswordVerifier {
  constructor(
    @Inject(USER_REPOSITORY)
    public userRepository: IUserRepository,

    @Inject(HASH)
    public hash: IHash,
  ) {}

  async verify(
    password: string,
    hashedPassword: string,
  ): Promise<void | never> {
    const isMatchs: boolean = await this.hash.compare(password, hashedPassword);
    if (!isMatchs) {
      throw InValidDataException();
    }
  }
}
