import { UserEntitie } from '../../entities/user.entitie';

export interface IGetUserByUsernameVerifier {
  getOr404(username: string): Promise<UserEntitie | never>;
}

export const GET_USER_BY_USERNAME_VERIFIER = Symbol(
  'GET_USER_BY_USERNAME_VERIFIER',
);
