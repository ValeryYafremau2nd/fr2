import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Table, TableSchema } from './table.schema';

export type SchemaDocument = HydratedDocument<Standing>;

@Schema()
export class Standing {

    @Prop()
    group: string;
  
    @Prop({ type: [TableSchema] })
    table: Table[];
}

export const StandingSchema = SchemaFactory.createForClass(Standing);
