import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth-guard';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: 'secret',

      signOptions: { expiresIn: '36000s' },
    }),
  ],

  providers: [JwtStrategy, AuthGuard],

  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
