import { UserDTO } from 'src/modules/user/dto/responses/user.dto';

export interface IUserUpdateHandler {
  handleEvent(payload: UserDTO): Promise<void>;
}

export const USER_UPDATED_HANDLER = Symbol('USER_UPDATD_HANDLER');
