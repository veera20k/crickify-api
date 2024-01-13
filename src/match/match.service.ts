import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { MatchDetails, MatchListInfo } from './interfaces/match.interface';
import { ApiError } from '../common/api-error';
import { getRandomColor } from '../common/helper';

@Injectable()
export class MatchService {
  async getMatchList(): Promise<{ forYou: MatchDetails[]; others: MatchDetails[] }> {
    const response = await fetch(`${process.env.ESPN_API_URL}/matches/current?lang=en&latest=true`);
  
    if (!response.ok) {
      throw new ApiError(`Failed to scrap data from the API. Status: ${response.status}`, response.status);
    }
    const data: { matches: MatchListInfo[] } = await response.json();
    const transformedMatches = data.matches.map(match => ({
      id: match.id,
      objectId: match.objectId,
      status: match.status,
      stage: match.stage,
      state: match.state,
      title: match.title,
      longName: match.series.longName,
      slug: match.slug,
      startDate: match.startDate,
      endDate: match.endDate,
      startTime: match.startTime,
      isCancelled: match.isCancelled,
      result: match.statusText,
      teams: match.teams,
      format: match.format,
      series: match.series,
      badgeColor: getRandomColor(match.id),
    }));
    // const categorizeMatches = (matches: any[], isCountry: boolean) => {
    //   return matches.filter(match => match.teams.some(team => team.team.isCountry) === isCountry);
    // };

    const forYou = [];
    const others = [];

    transformedMatches.forEach(match => {
      if (match.teams.every(team => team?.team?.isCountry || team?.team?.country.name === 'India')) {
        forYou.push(match);
      } else {
        others.push(match);
      }
    })
    const sortMatches = (matches: any[]) => {
      const order = { RUNNING: 1, FINISHED: 2, SCHEDULED: 3 };
      return matches.sort((a, b) => {
        const stageOrderA = order[a.stage] || 0;
        const stageOrderB = order[b.stage] || 0;
        if (stageOrderA === stageOrderB) {
          const startTimeA = new Date(a.startTime || a.startDate).getTime();
          const startTimeB = new Date(b.startTime || b.startDate).getTime();
          return startTimeA - startTimeB;
        }
        return stageOrderA - stageOrderB;
      });
    };
    return { forYou: sortMatches(forYou), others: sortMatches(others) };
  }
  

 async getMatch(matchId: string, seriesId: string): Promise<MatchDetails> {
    const response = await fetch(`${process.env.ESPN_API_URL}match/details?matchId=${matchId}&seriesId=${seriesId}&lang=en&latest=true`);
    if (!response.ok) {
      throw new ApiError(`Failed to scrap data from the API. Status: ${response.status}`, response.status);
    }
    return await response.json();
  }

  async getGround(groundId: string): Promise<unknown> {
    const response = await fetch(`${process.env.ESPN_API_URL}ground/home?groundId=${groundId}&lang=en`);
    if (!response.ok) {
      throw new ApiError(`Failed to scrap data from the API. Status: ${response.status}`, response.status);
    }
    return await response.json();
  }

}
