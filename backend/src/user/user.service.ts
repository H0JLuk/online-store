import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { Basket } from 'src/basket/models/basket';
import { Role } from 'src/role/models/role';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './models/user';
import { JwtResponse } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserDecoded } from './dto/decoded-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Basket)
    private basketsRepository: Repository<Basket>,
    private authService: AuthService,
  ) {}

  async registration(dto: CreateUserDto): Promise<JwtResponse> {
    try {
      const { email, password, role: roleName = 'user' } = dto;

      let role = await this.rolesRepository.findOne({ name: roleName });
      if (!role) {
        role = await this.rolesRepository.save({ name: roleName });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await this.usersRepository.save({ email, password: hashPassword, roleId: role.id });

      await this.basketsRepository.save({ userId: user.id });

      const token = this.authService.signToken(user.id, email, role.name);

      return { token };
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(dto: LoginUserDto): Promise<JwtResponse> {
    try {
      const { email, password } = dto;
      const user = await this.authService.getUserByEmail(email);

      const comparePasswords = bcrypt.compareSync(password, user.password);

      if (!comparePasswords) {
        throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
      }

      const token = this.authService.signToken(user.id, email, user.role.name);

      return { token };
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException('Unregister email', HttpStatus.BAD_REQUEST);
      }
      if (e instanceof HttpException) {
        throw new HttpException(e.getResponse(), e.getStatus());
      }
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  check(user: UserDecoded): JwtResponse {
    const token = this.authService.signToken(user.userId, user.email, user.role);
    return { token };
  }
}
