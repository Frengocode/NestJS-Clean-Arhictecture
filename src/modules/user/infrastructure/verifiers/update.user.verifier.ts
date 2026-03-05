import { UserEntitie } from '../../entities/user.entitie';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../interfaces/repository/iuser.repository';
import { UpdateUserDTO } from '../../dto/request/update-user';
import { Inject, Injectable } from '@nestjs/common';
import { IUpdateUserVerifier } from '../../interfaces/verifiers/iupdate.user.verifier';
import { UserNotFoundException } from '../../exceptions/exceptions';

@Injectable()
export class UpdateUserVerfier implements IUpdateUserVerifier {
  constructor(
    @Inject(USER_REPOSITORY)
    public userRepository: IUserRepository,
  ) {}

  async updateOr404(
    dto: UpdateUserDTO,
    currentUserID: number,
  ): Promise<UserEntitie | never> {
    const user: UserEntitie | null =
      await this.userRepository.getUserById(currentUserID);
    if (!user) {
      throw UserNotFoundException();
    }
    const updatedUser: UserEntitie = await this.userRepository.updateUser(
      user,
      dto,
    );
    return updatedUser;
  }
}
