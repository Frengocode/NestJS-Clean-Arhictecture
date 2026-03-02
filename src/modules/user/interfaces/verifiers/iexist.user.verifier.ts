export interface IExistUserVerifier {
  verifyExistUser(username: string): Promise<never | void>;
}

export const EXIST_USER_VERIFIER = Symbol('EXIST_USER_VERIFIER');
