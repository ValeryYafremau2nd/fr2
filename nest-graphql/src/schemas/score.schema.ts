import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SchemaDocument = HydratedDocument<Score>;

@Schema()
export class Score{
    @Prop()
    winner: String
}

export const ScoreSchema = SchemaFactory.createForClass(Score); 