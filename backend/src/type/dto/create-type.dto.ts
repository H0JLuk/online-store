import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ minLength: 4, maxLength: 25, example: 'Phones' })
  @IsString()
  @Length(4, 25)
  readonly name: string;
}
