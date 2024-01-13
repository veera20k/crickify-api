import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService) { }
    @Get('list')
    getMatchList() {
        return this.matchService.getMatchList();
    }

    @Get(':id')
    getMatch(@Param('id') id: string, @Query('seriesId') seriesId: string) {
        return this.matchService.getMatch(id, seriesId);
    }

    @Get('playing11/:matchId/:seriesId')
    async getPlayingEleven(@Param('matchId') matchId: string, @Param('seriesId') seriesId: string) {
        const matchDetails = await this.matchService.getMatch(matchId, seriesId);
        return matchDetails.matchSquads || {};
    }

    @Get('ground/:matchId/:seriesId')
    getGround(@Param('groundId') groundId: string) {
        return this.matchService.getGround(groundId);
    }

}
