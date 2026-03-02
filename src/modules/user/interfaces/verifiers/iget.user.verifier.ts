import { UserEntitie } from '../../entities/user.entitie';

export interface IGetUserVerifier {
  getOr404(userID: number): Promise<UserEntitie | never>;
}

export const GET_USER_VERIFIER = Symbol('GET_USER_VERIFIER');
