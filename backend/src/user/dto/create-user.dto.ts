import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 's@mail.ru' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ minLength: 6, maxLength: 20, example: '1234Aa' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  @IsEnum(['user', 'admin'])
  role: string;
}
