import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/models/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({ where: { email }, relations: ['role'] });
    return user;
  }

  signToken(userId: number, email: string, role: string): string {
    const token = this.jwtService.sign({ userId, email, role });
    return token;
  }

  decodeToken(header: string): { userId: number; email: string; role: string; iat: number; exp: number } {
    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw 0;
    }

    const user = this.jwtService.verify(token);
    return user;
  }
}
