import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    title: 'username',
    description: 'Username of user',
    type: 'string',
  })
  @IsString()
  @MinLength(5, { message: 'Username name should have 5 words !!!' })
  public username: string;

  @ApiProperty({
    title: 'password',
    description: 'Password of user',
    type: 'string',
  })
  @IsString()
  @MinLength(8, { message: 'Password should have 8 words' })
  public password: string;
}
