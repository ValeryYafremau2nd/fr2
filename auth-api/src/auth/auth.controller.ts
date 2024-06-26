import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Public } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<any> {
    const salt = 'abc';
    // const hashedPassword = await crypto.hash(password, salt);
    const result = await this.usersService.createUser(username, password);
    const payload = {
      sub: result.id,
      username: result.username,
      role: result.role,
    };
    return this.authService.signToken(payload);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @Get('profile/:username')
  getProfile(@Request() req, @Param('username') username: string) {
    return req.user.username === username
      ? this.usersService.findOne(req.user.username)
      : null;
  }
}
