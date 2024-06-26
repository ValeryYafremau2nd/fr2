import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Team } from './team.model';

 @ObjectType({ description: 'table ' })
 export class Table {

   @Field(type => Int)
   points: number;

   @Field(type => Int)
   won: number;

   @Field(type => Int)
   draw: number;

   @Field(type => Int)
   lost: number;

   @Field(type => Int)
   position: number;

   @Field()
   team: Team;
 }