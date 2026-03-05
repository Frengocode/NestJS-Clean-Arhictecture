import { PaginationDTO } from 'src/common/pagination/pagination.dto';
import { CreateUserDTO } from '../../dto/request/create-user';
import { UpdateUserDTO } from '../../dto/request/update-user';
import { UserEntitie } from '../../entities/user.entitie';

export interface IUserRepository {
  createUser(dto: CreateUserDTO): Promise<UserEntitie>;
  _get_by_column(column: string, value: any): Promise<UserEntitie | null>;
  getUserById(userID: number): Promise<UserEntitie | null>;
  getUserByUsername(username: string): Promise<UserEntitie | null>;
  getUsers(pagination: PaginationDTO): Promise<UserEntitie[]>;
  updateUser(instance: UserEntitie, dto: UpdateUserDTO): Promise<UserEntitie>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
