import { UserDTO } from '../../dto/responses/user.dto';
import { PaginationDTO } from 'src/common/pagination/pagination.dto';

/**
 * @summary Get's list of users by pagination and returns them
 */
export interface IGetUsersUseCase {
  execute(pagination: PaginationDTO): Promise<UserDTO[] | unknown | never>;
}

export const GET_USERS_USE_CASE = Symbol('GET_USERS_USE_CASE');
