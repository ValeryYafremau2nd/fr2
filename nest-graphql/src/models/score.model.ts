import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'score ' })
export class Score {
  @Field({ nullable: true })
  winner: string;
}