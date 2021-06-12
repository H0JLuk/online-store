import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetAllBrandsQueries {
  @ApiProperty({ minimum: 1, example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly typeId: number;

  @ApiProperty({ minimum: 1, example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number;

  @ApiProperty({ minimum: 1, example: 9, default: 9 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit: number;
}
