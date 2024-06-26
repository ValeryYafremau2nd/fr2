import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/user.decorator';
import { AuthGuard } from '../auth/auth-guard';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Favorite } from './favorite.model';
import { FavoriteService } from './favorite.service';

@Resolver((of) => Favorite)
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Query((returns) => Favorite)
  @UseGuards(AuthGuard)
  async getFavorite(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: any//{userId: string, }
  ): Promise<Favorite> {
    console.log(user)
    return this.favoriteService.findById(user.sub);
  }
  
  @ResolveField('teamsInfo', returns => [Team])
  async getTeams(@Parent() favorite: Favorite) {
    return this.favoriteService.findTeams(favorite.teams);
  }
  
  @ResolveField('matchesInfo', returns => [Match])
  async getMatches(@Parent() favorite: Favorite) {
    return Promise.resolve((await this.favoriteService.findMatches(favorite)).map(item => (item as any).matches));
  }

  @Mutation((returns) => Favorite)
  @UseGuards(AuthGuard)
  async updateFavorite(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'teams', type: () => [Int] }) teams: number[],
    @Args({ name: 'matches', type: () => [Int] }) matches: number[],
    @CurrentUser() user: any//{userId: string, }
  ) {
    return this.favoriteService.updateFavorite({ id: user.sub, teams, matches });
  }

  @Mutation((returns) => Favorite)
  @UseGuards(AuthGuard)
  async removeFromFavorite(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'teams', type: () => [Int] }) teams: number[],
    @Args({ name: 'matches', type: () => [Int] }) matches: number[],
    @CurrentUser() user: any//{userId: string, }
  ) {
    return this.favoriteService.removeFromFavorite(user.sub, teams, matches);
  }
}
