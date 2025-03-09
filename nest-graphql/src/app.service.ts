import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Competition } from './models/competition.model';
import { League, LeagueSchemaName } from './schemas/league.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(LeagueSchemaName)
    private readonly leagueModel: Model<League & Document>,
  ) {}

  getHello(): string {
    return 'test';
  }

  async findAll(): Promise<Competition[]> {
    return this.leagueModel.find();
  }

  async findById(id: number): Promise<Competition> {
    return this.leagueModel.findOne({ id });
  }
}
