import { Payload } from '../../types/payload';

export interface ITokenGenerator {
  generator(payload: Payload): Promise<string>;
}

export const TOKEN_GENERATOR = Symbol('TOKEN_GENERATOR');
