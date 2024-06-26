import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Score } from './score.model';
import { Team } from './team.model';

@ObjectType({ description: 'match ' })
export class Match {
  @Field(type => Int)
  id: number;

  @Field()
  utcDate: string;

  @Field()
  status: string;

  @Field()
  homeTeam: Team;

  @Field()
  awayTeam: Team;

  @Field()
  score: Score;
}