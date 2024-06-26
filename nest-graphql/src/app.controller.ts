import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Competition } from './models/competition.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
