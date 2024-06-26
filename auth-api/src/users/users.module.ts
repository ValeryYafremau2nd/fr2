import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity/user.entity';
import { RoleEntity } from './role.entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule { }