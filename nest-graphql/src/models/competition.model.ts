import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Match } from './match.model';
import { Standing } from './standing.model';

@ObjectType({ description: 'competition ' })
export class Competition {
  @Field(type => Int)
  id: number;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emblemUrl: string;

  @Field((type) => [Match], { nullable: true })
  matches: Match[];

  @Field((type) => [Standing], { nullable: true })
  standings: Standing[];
}