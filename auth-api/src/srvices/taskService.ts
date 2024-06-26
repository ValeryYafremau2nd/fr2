import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private leagues = [2001, 2014, 2021, 2002, 2019, 2015];
  constructor(@Inject('TEST_SERVICE') private client: ClientProxy) {
}

  @Cron('1 * * * * *')
  handleCron() {
    const league = this.leagues.pop();
    let a = this.client.send<number>('test', league);
    a.subscribe((data) => {
        console.log(data)
        this.logger.debug(data);
        this.leagues.unshift(league)
    })
  }
}
