import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Table } from './table.model';

 @ObjectType({ description: 'standing ' })
 export class Standing {

   @Field()
   group: string;

   @Field(type => [Table])
   table: Table[];
 }