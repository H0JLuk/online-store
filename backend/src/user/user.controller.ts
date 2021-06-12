import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDecoded } from '../user/dto/decoded-user';
import { AuthGuard } from 'src/auth/auth.guard';

export class JwtResponse {
  @ApiProperty({ example: 'fsdnjbdhjvbfghjsdvghfsd.gdfhbgrdvghrd.grdghthf' })
  readonly token: string;
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: HttpStatus.CREATED, type: JwtResponse })
  @Post('registration')
  registration(@Body() dto: CreateUserDto): Promise<JwtResponse> {
    return this.userService.registration(dto);
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: HttpStatus.CREATED, type: JwtResponse })
  @Post('login')
  login(@Body() dto: CreateUserDto): Promise<JwtResponse> {
    return this.userService.login(dto);
  }

  @Get('check')
  @UseGuards(AuthGuard)
  check(@Req() req: { user: UserDecoded }): JwtResponse {
    const { user } = req;
    return this.userService.check(user);
  }
}
