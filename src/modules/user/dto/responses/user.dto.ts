import { BaseDTO } from 'src/common/dto/base.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntitie } from '../../entities/user.entitie';

export class UserDTO implements BaseDTO<UserDTO> {
  @ApiProperty({
    title: 'id',
    description: 'Id of user',
    type: 'number',
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    title: 'username',
    description: 'Username of user',
    type: 'string',
  })
  @IsString()
  public username: string;

  @ApiProperty({
    title: 'createdAt',
    description: 'CreatedAt of user',
    type: 'string',
  })
  @IsDate()
  public createdAt: Date;

  @ApiPropertyOptional({
    title: 'updatedAt',
    description: 'UpdatedAt of user',
    type: 'string',
  })
  @IsOptional()
  @IsDate()
  public updatedAt?: Date;

  public parseJson(json: string): UserDTO {
    const parsedJson = JSON.parse(json) as UserDTO;
    return Object.assign(new UserDTO(), parsedJson);
  }

  public apply(entitie: UserEntitie): UserDTO {
    return Object.assign(new UserDTO(), {
      id: entitie.id,
      username: entitie.username,
      createdAt: entitie.createdAt,
      updatedAt: entitie.updatedAt,
    });
  }

  public entitieMapper(entitie: UserEntitie): UserDTO {
    return this.apply(entitie);
  }

  public listMapper(entities: UserEntitie[]): UserDTO[] {
    return entities.map((entitie) => this.apply(entitie));
  }
}
