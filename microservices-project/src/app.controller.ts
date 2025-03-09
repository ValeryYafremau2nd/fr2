import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { MongoClient } from 'mongodb';
import { promisify } from 'util';
const request = promisify(require('request'));

@Controller()
export class AppController {
  private readonly logger = new Logger('ms');
  @MessagePattern('league_update')
  accumulate(@Payload() data: any, @Ctx() context: RmqContext): number {
    this.logger.debug('mservice' + data);

    let url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@host.docker.internal:27017/?authSource=admin&readPreference=primary&ssl=false`;
    let client = new MongoClient(url);

    const options = {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.TOKEN,
      },
    };

    const leagueInfo = async (leagueId) => {
      const collection = client.db('foot-reminder').collection('competitions');
      let { body } = await request(
        'https://' + 'api.football-data.org' + '/v2/competitions/' + leagueId,
        options,
      );
      body = JSON.parse(body);
      await collection.updateOne(
        {
          id: leagueId,
        },
        {
          $set: {
            ...body,
          },
        },
        {
          upsert: true,
        },
      );

      let res = await request(
        `https://api.football-data.org/v4/competitions/${leagueId}/standings`,
        options,
      );
      await collection.updateOne(
        {
          id: leagueId,
        },
        {
          $set: {
            standings: JSON.parse(res.body).standings,
          },
        },
        {
          upsert: true,
        },
      );
      res = await request(
        'https://' +
          'api.football-data.org' +
          '/v2/competitions/' +
          leagueId +
          '/matches',
        options,
      );
      await collection.updateOne(
        {
          id: leagueId,
        },
        {
          $set: {
            matches: JSON.parse(res.body).matches,
          },
        },
        {
          upsert: true,
        },
      );

      const teams = client.db('foot-reminder').collection('teams');
      res = await request(
        'https://' +
          'api.football-data.org' +
          '/v2/competitions/' +
          leagueId +
          '/teams',
        options,
      );
      const mappedTeams = JSON.parse(res.body).teams.map((team) => {
        team.leagueId = leagueId;
        return team;
      });
      await teams.deleteMany({ leagueId });
      await teams.insertMany(mappedTeams);
      console.log(`league ${leagueId} added`);
    };

    data && client.connect().then(() => leagueInfo(data));

    return 1;
  }
}
