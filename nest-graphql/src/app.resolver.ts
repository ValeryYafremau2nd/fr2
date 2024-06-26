import {
  Args,
  Int,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AppService } from './app.service';
import { Competition } from './models/competition.model';

@Resolver((of) => Competition)
export class CompetitionResolver {
  constructor(private readonly appService: AppService) {}

  @Query((returns) => [Competition])
  async leagues(): Promise<Competition[]> {
    return this.appService.findAll();
  }

  @Query((returns) => Competition)
  async getLeague(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Competition> {
    return this.appService.findById(id);
  }
}
