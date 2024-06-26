import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


export type SchemaDocument = HydratedDocument<Team>;

@Schema()
export class Team{
    @Prop({ required: true })
    id: number;

    @Prop()
    name: string;

    @Prop()
    shortName: string;

    @Prop()
    tla: string;

    @Prop()
    crestUrl: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
export const TeamSchemaName = 'teams';