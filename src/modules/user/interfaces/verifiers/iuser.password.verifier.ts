export interface IUserPasswordVerifier {
  verify(password: string, hashedPassword: string): Promise<void | never>;
}

export const USER_PASSWORD_VERIFIER = Symbol('USER_PASSWORD_VERIFIER');
