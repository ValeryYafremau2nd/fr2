import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './srvices/taskService';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'oauth',
      autoLoadEntities: true,
      insecureAuth: true,
      synchronize: true,
      //entities: [__dirname + '/../**/*.entity.{js,ts}']
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
    AuthModule,
    ClientsModule.register([
      {
        name: 'TEST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://host.docker.internal:5672'],
          queue: 'test',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
