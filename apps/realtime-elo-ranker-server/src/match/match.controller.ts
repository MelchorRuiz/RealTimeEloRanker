import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';

@Controller('api/match')
export class MatchController {
    constructor(private readonly matchService: MatchService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async createMatch(@Body() match: Match) {
        try {
            const result = await this.matchService.createMatch(match);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
