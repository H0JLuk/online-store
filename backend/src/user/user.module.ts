import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { Role } from 'src/role/models/role';
import { Basket } from 'src/basket/models/basket';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Basket]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
