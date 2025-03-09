import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompetitionResolver } from './app.resolver';
import { LeagueSchema, LeagueSchemaName } from './schemas/league.schema';
import { FavoriteModule } from './favorite/favorite.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `../.env` }),
    FavoriteModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: ({ req }) => {
        return { request: req };
      },
      plugins: [],
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@host.docker.internal:27017/mongoose_journey?authSource=admin`,
      {
        dbName: 'foot-reminder',
      },
    ),
    MongooseModule.forFeature([
      { name: LeagueSchemaName, schema: LeagueSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, CompetitionResolver],
})
export class AppModule {}
