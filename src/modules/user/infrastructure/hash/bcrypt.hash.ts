import { IHash } from '../../interfaces/hash/ihash';

var bcrypt = require('bcrypt');

export class BcryptHash implements IHash {
  async hash(value: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(value, saltRounds);
  }
  async compare(secret: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(secret, hash);
  }
}
