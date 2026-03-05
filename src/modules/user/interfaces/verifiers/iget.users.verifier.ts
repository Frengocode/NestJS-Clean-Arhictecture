import { UserEntitie } from '../../entities/user.entitie';
import { PaginationDTO } from 'src/common/pagination/pagination.dto';

/**
 * @summary Returns list of users or throws exception
 */
export interface IGetUsersVerifier {
  getOr404(pagination: PaginationDTO): Promise<UserEntitie[] | never>;
}

export const GET_USERS_VERIFIER = Symbol('GET_USERS_VERIFIER');
