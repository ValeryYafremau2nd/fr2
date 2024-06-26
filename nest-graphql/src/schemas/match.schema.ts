import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Score } from '../models/score.model';
import { ScoreSchema } from './score.schema';
import { Team, TeamSchema } from './team.schema';

export type SchemaDocument = HydratedDocument<Match>;

@Schema()
export class Match {
    @Prop({ required: true })
    id: number;
  
    @Prop()
    utcDate: string;
  
    @Prop()
    status: string;
  
    @Prop({ type: TeamSchema })
    homeTeam: Team;
  
    @Prop({ type: TeamSchema })
    awayTeam: Team;
  
    @Prop({ type: ScoreSchema })
    score: Score;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
