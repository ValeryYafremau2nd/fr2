import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Favorite } from './favorite.schema';
import { Match, MatchSchema } from './match.schema';
import { Standing, StandingSchema } from './standing.schema';


export type SchemaDocument = HydratedDocument<League>;

@Schema()
export class League{
    @Prop({ required: true })
    id: Number;

    @Prop({ required: true })
    code: String;

    @Prop()
    name: String;

    @Prop()
    emblemUrl: String;

    @Prop({ type: [MatchSchema]})
    matches: Match[];

    @Prop({ type: [StandingSchema]})
    standings: Standing[];
}

export const LeagueSchema = SchemaFactory.createForClass(League); 
LeagueSchema.statics.getAllTrackedMatches = async function (
    favorite: Favorite
  ) {
    return this.aggregate([
      {
        $project: {
          _id: 0,
          emblemUrl: 1,
          matches: 1
        }
      },
      {
        $addFields: {
          'matches.emblemUrl': '$emblemUrl'
        }
      },
      {
        $unwind: '$matches'
      },
      {
        $match: {
          'matches.status': { $not: { $eq: 'CANCELLED' } }
        }
      },
      {
        $addFields: {
          'matches.tracked': {
            $in: ['$matches.id', favorite.matches]
          },
          'matches.homeTeam.tracked': {
            $in: ['$matches.homeTeam.id', favorite.teams]
          },
          'matches.awayTeam.tracked': {
            $in: ['$matches.awayTeam.id', favorite.teams]
          }
        }
      },
      {
        $match: {
          $or: [
            {
              'matches.tracked': true
            },
            {
              'matches.homeTeam.tracked': true
            },
            {
              'matches.awayTeam.tracked': true
            }
          ]
        }
      },
      {
        $addFields: {
          'matches.matchDay': {
            $dateToString: {
              format: '%Y-%m-%d',
              date: {
                $dateFromString: {
                  dateString: '$matches.utcDate'
                }
              }
            }
          }
        }
      },
      {
        $sort: {
          'matches.utcDate': 1
        }
      },
      {
        $group: {
          _id: '$matches.matchDay',
          matches: {
            $push: '$matches'
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);
  };


export const LeagueSchemaName = 'competitions'; 