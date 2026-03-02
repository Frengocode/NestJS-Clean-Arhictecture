import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    title: 'username',
    description: 'Username of user',
    type: 'string',
  })
  @IsString()
  @MinLength(5, { message: 'Username name should have 5 words !!!' })
  public username: string;
}
