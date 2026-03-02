import { CreateUserDTO } from '../dto/request/create-user';
import { ICreateUserUseCase } from '../interfaces/use-cases/icreate.user.use-case';
import { type IHash, HASH } from '../interfaces/hash/ihash';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../interfaces/repository/iuser.repository';
import {
  type IExistUserVerifier,
  EXIST_USER_VERIFIER,
} from '../interfaces/verifiers/iexist.user.verifier';
import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/responses/user.dto';
import { UserEntitie } from '../entities/user.entitie';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(HASH)
    public hash: IHash,

    @Inject(USER_REPOSITORY)
    public userRepository: IUserRepository,

    @Inject(EXIST_USER_VERIFIER)
    public existUserVerifier: IExistUserVerifier,
  ) {}

  async execute(dto: CreateUserDTO): Promise<UserDTO | never> {
    await this.existUserVerifier.verifyExistUser(dto.username);

    // Hashing password
    dto.password = await this.hash.hash(dto.password, 12);

    const user: UserEntitie = await this.userRepository.createUser(dto);

    console.log(user);

    const mapper: UserDTO = new UserDTO();
    return mapper.entitieMapper(user);
  }
}
