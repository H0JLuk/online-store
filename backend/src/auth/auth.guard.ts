import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDecoded } from 'src/user/dto/decoded-user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw 0;
      }
      req.user = this.jwtService.verify<UserDecoded>(token);

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
