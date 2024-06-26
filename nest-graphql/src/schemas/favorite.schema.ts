import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Match, MatchSchema } from './match.schema';
import { Standing, StandingSchema } from './standing.schema';
import { Team } from './team.schema';


export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite{
    @Prop({ required: true })
    uId: number;

    @Prop({ type: [Number]})
    teams: number[];

    @Prop({ type: [Number]})
    matches: number[];

    @Prop({ type: [Team]})
    teamsInfo: Team[];

    @Prop({ type: [Team]})
    matchesInfo: Match[];

}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite); 

export const FavoriteSchemaName = 'favorite'; 