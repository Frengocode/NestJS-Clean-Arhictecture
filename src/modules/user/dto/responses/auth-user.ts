import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';
import { UserEntitie } from '../../entities/user.entitie';

export class AuthUserDTO implements BaseDTO<AuthUserDTO> {
  @ApiProperty({
    title: 'id',
    description: 'Id of user',
    type: 'number',
    example: 5,
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    title: 'username',
    description: 'Id of uesr',
    type: 'string',
    example: 'jhondoe',
  })
  @IsString()
  public username: string;

  @ApiProperty({
    title: 'password',
    description: 'Password of user',
    type: 'string',
    example: '$24jJkfj2k4....',
  })
  @IsString()
  public password: string;

  public entitieMapper(entitite: UserEntitie): AuthUserDTO {
    return Object.assign(new AuthUserDTO(), {
      id: entitite.id,
      username: entitite.username,
      password: entitite.password,
    });
  }

  public parseJson(json: string): AuthUserDTO {
    const parsedJson = JSON.parse(json) as AuthUserDTO;
    return Object.assign(new AuthUserDTO(), parsedJson);
  }
}
