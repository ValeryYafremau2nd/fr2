import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Team, TeamSchema } from './team.schema';

export type SchemaDocument = HydratedDocument<Table>;

@Schema()
export class Table {

    @Prop()
    points: number;
 
    @Prop()
    won: number;
 
    @Prop()
    draw: number;
 
    @Prop()
    lost: number;
 
    @Prop()
    position: number;
 
    @Prop({ type: TeamSchema })
    team: Team;
}

export const TableSchema = SchemaFactory.createForClass(Table);
