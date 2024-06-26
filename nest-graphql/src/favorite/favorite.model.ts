import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';

@ObjectType({ description: 'favorite' })
export class Favorite {
  @Field((type) => Int)
  uId: number;

  @Field((type) => [Int], { nullable: 'itemsAndList' })
  matches: number[];

  @Field((type) => [Int], { nullable: 'itemsAndList' })
  teams: number[];

  @Field((type) => [Match], { nullable: 'itemsAndList' })
  matchesInfo: Match[];

  @Field((type) => [Team], { nullable: 'itemsAndList' })
  teamsInfo: Team[];
}
