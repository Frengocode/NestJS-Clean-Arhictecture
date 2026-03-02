import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthUserRequestDTO {
  @ApiProperty({
    title: 'username',
    description: 'username of user',
    type: 'string',
    example: 'jhondoe',
  })
  @IsString()
  public username: string;

  @ApiProperty({
    title: 'password',
    description: 'Password of user',
    type: 'string',
    example: 'string123321',
  })
  @IsString()
  public password: string;
}
