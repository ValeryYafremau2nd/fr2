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
  @MessagePattern('test')
  accumulate(@Payload() data: any, @Ctx() context: RmqContext): number {
    this.logger.debug('mservice' + data);
    console.log('mservice' + data);

    let url =
      'mongodb://user:pass@host.docker.internal:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
    let client = new MongoClient(url);

    const options = {
      method: 'GET',
      headers: {
        'X-Auth-Token': 'abd08f762e224d1a8d0b071a3c4d0c7d',
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
