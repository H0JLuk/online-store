import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { User } from 'src/user/models/user';

@Module({
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.JWT_KEY}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
