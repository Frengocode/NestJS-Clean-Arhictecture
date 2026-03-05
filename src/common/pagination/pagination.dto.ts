import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDTO {
  @ApiPropertyOptional({ title: 'page', type: Number, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  public readonly page: number = 0;

  @ApiPropertyOptional({ title: 'take', type: Number, default: 10 })
  @IsOptional()
  @Transform(({ value, obj }) => value ?? obj?.limit)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly take: number = 10;
}
