import { CreateUserDTO } from '../../dto/request/create-user';
import { UserEntitie } from '../../entities/user.entitie';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../interfaces/repository/iuser.repository';
import { UpdateUserDTO } from '../../dto/request/update-user';
import { PaginationDTO } from 'src/common/pagination/pagination.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntitie)
    public repo: Repository<UserEntitie>,
  ) {}

  async createUser(dto: CreateUserDTO): Promise<UserEntitie> {
    const user: UserEntitie = this.repo.create({
      username: dto.username,
      password: dto.password,
    });
    return await this.repo.save(user);
  }

  async _get_by_column(
    column: string,
    value: any,
  ): Promise<UserEntitie | null> {
    const result: UserEntitie | null = await this.repo.findOneBy({
      [column]: value,
    });
    return result;
  }

  async getUserById(userID: number): Promise<UserEntitie | null> {
    return await this._get_by_column('id', userID);
  }
  async getUserByUsername(username: string): Promise<UserEntitie | null> {
    return await this._get_by_column('username', username);
  }

  async getUsers(pagination: PaginationDTO): Promise<UserEntitie[]> {
    const users: UserEntitie[] = await this.repo.find({
      take: pagination.take,
      skip: pagination.page * pagination.take,
      order: {
        createdAt: "desc",
      },
    });
    return users;
  }

  async updateUser(
    instance: UserEntitie,
    dto: UpdateUserDTO,
  ): Promise<UserEntitie> {
    const updatedUser: UserEntitie = this.repo.merge(instance, dto);
    return await this.repo.save(updatedUser);
  }
}
