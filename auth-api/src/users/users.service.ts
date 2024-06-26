import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<any | undefined> {
    return this.usersRepository.findOne({
      relations: { role: true },
      where: {
        username,
      },
    });
  }
  async createUser(username: string, password: string): Promise<any> {
    return this.usersRepository.save({
      username,
      password,
      roleId: 1,
    });
  }
}
