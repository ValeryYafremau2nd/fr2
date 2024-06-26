import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

 @ObjectType({ description: 'team ' })
 export class Team {
   @Field(type => Int)
   id: number;

   @Field()
   name: string;

   @Field()
   shortName: string;

   @Field()
   tla: string;

   @Field()
   crestUrl: string;
 }