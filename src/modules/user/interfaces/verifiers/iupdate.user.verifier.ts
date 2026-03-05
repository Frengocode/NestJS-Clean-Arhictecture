import { UpdateUserDTO } from '../../dto/request/update-user';
import { UserEntitie } from '../../entities/user.entitie';

export interface IUpdateUserVerifier {
  updateOr404(
    dto: UpdateUserDTO,
    currentUserID: number,
  ): Promise<UserEntitie | never>;
}

export const UPDATE_USER_VERIFIER = Symbol('UPDATE_USER_VERIFIER');
