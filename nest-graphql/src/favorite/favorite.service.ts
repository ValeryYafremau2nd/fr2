import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamSchemaName } from '../schemas/team.schema';
import { Favorite, FavoriteSchemaName } from '../schemas/favorite.schema';
import { League, LeagueSchemaName } from 'src/schemas/league.schema';
import { Match } from '../schemas/match.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(FavoriteSchemaName)
    private readonly favoriteModel: Model<Favorite & Document>,

    @InjectModel(TeamSchemaName)
    private readonly teamModel: Model<Team & Document>,

    @InjectModel(LeagueSchemaName)
    private readonly leagueModel: Model<League & Document>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findById(id: number): Promise<Favorite> {
    return this.favoriteModel.findOne({ uId: id });
  }

  async findTeams(teamsId): Promise<Team[]> {
    return this.teamModel.find({
      id: {
        $in: teamsId,
      },
    });
  }

  async findMatches(favorite): Promise<Match[]> {
    return this.leagueModel.aggregate([
      {
        $project: {
          _id: 0,
          emblemUrl: 1,
          matches: 1,
        },
      },
      {
        $addFields: {
          'matches.emblemUrl': '$emblemUrl',
        },
      },
      {
        $unwind: '$matches',
      },
      {
        $match: {
          'matches.status': { $not: { $eq: 'CANCELLED' } },
        },
      },
      {
        $addFields: {
          'matches.tracked': {
            $in: ['$matches.id', favorite.matches],
          },
          'matches.homeTeam.tracked': {
            $in: ['$matches.homeTeam.id', favorite.teams],
          },
          'matches.awayTeam.tracked': {
            $in: ['$matches.awayTeam.id', favorite.teams],
          },
        },
      },
      {
        $match: {
          $or: [
            {
              'matches.tracked': true,
            },
            {
              'matches.homeTeam.tracked': true,
            },
            {
              'matches.awayTeam.tracked': true,
            },
          ],
        },
      },
      {
        $unwind: '$matches',
      } /*,
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
      }*/,
    ]);
  }

  async updateFavorite({ id, teams, matches }): Promise<Favorite> {
    return this.favoriteModel.findOneAndUpdate(
      {
        uId: id,
      },
      {
        $push: {
          teams,
          matches,
        },
      },
      {
        upsert: true,
      },
    );
  }
  removeFromFavorite(id: number, teams: number[], matches: number[]) {
    return this.favoriteModel.findOneAndUpdate(
      {
        uId: id,
      },
      {
        $pull: {
          teams: {
            $in: teams,
          },
          matches: {
            $in: matches,
          },
        },
      },
      { multi: true },
    );
  }
}
