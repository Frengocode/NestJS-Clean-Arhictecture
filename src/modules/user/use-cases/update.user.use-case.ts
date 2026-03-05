import { UserDTO } from '../dto/responses/user.dto';
import { UpdateUserDTO } from '../dto/request/update-user';
import { Inject, Injectable } from '@nestjs/common';
import { UserEventsPublisher } from '../events/user.events';
import { IUpdateUserUseCase } from '../interfaces/use-cases/iupdate.user.use-case';
import { UserEntitie } from '../entities/user.entitie';
import {
  type IUpdateUserVerifier,
  UPDATE_USER_VERIFIER,
} from '../interfaces/verifiers/iupdate.user.verifier';

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject()
    public userEventPublisher: UserEventsPublisher,

    @Inject(UPDATE_USER_VERIFIER)
    public updateUserVerifier: IUpdateUserVerifier,
  ) {}

  async execute(dto: UpdateUserDTO, currentUserID: number): Promise<UserDTO> {
    const updatedUser: UserEntitie | never =
      await this.updateUserVerifier.updateOr404(dto, currentUserID);

    const response: UserDTO = UserDTO.entitieMapper(updatedUser);
    await this.userEventPublisher.publishUserUpdated(response);
    return response;
  }
}
