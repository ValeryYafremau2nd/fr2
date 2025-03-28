import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return this.signToken({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
  }
  async signToken(payload) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
