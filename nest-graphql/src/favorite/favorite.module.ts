import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema, TeamSchemaName } from '../schemas/team.schema';
import { FavoriteSchema, FavoriteSchemaName } from '../schemas/favorite.schema';
import { LeagueSchema, LeagueSchemaName } from '../schemas/league.schema';
import { FavoriteResolver } from './favorite.resolver';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from '../auth/auth-guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',

      signOptions: { expiresIn: '36000s' },
    }),
    MongooseModule.forFeature([
      { name: FavoriteSchemaName, schema: FavoriteSchema },
      { name: TeamSchemaName, schema: TeamSchema },
      { name: LeagueSchemaName, schema: LeagueSchema },
    ]),
  ],
  providers: [FavoriteService, FavoriteResolver, AuthGuard],
})
export class FavoriteModule {}
