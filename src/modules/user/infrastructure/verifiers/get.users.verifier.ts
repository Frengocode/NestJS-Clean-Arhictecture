import { IGetUsersVerifier } from '../../interfaces/verifiers/iget.users.verifier';
import { UserEntitie } from '../../entities/user.entitie';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../interfaces/repository/iuser.repository';
import { Inject, Injectable } from '@nestjs/common';
import { PaginationDTO } from 'src/common/pagination/pagination.dto';
import { UsersNotFoundException } from '../../exceptions/exceptions';

@Injectable()
export class GetUsersVerifier implements IGetUsersVerifier {
  constructor(
    @Inject(USER_REPOSITORY)
    public userRepository: IUserRepository,
  ) {}

  async getOr404(pagination: PaginationDTO): Promise<UserEntitie[] | never> {
    const users: UserEntitie[] = await this.userRepository.getUsers(pagination);
    if (users.length < 0) {
      throw UsersNotFoundException();
    }
    return users;
  }
}
