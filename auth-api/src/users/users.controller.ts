import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
import { of } from 'rxjs';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get('/')
    getUsers() {
        return of(['test'])
        //return this.service.getUsers();
    }
}