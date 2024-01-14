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

    @Get('ground/:matchId/:seriesId')
    getGround(@Param('groundId') groundId: string) {
        return this.matchService.getGround(groundId);
    }

    @Get('playingEleven/:matchId/:seriesId')
    getPlayingEleven(@Param('matchId') matchId: string, @Param('seriesId') seriesId: string) {
        return this.matchService.getPlayingEleven(matchId, seriesId);
    }

}
