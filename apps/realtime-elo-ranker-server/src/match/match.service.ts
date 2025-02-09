import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../players/entities/player.entity';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) { }

    async createMatch(match: Match): Promise<any> {
        const winner = await this.playerRepository.findOne({ where: { id: match.winner } });
        const loser = await this.playerRepository.findOne({ where: { id: match.loser } });

        if (!winner || !loser) {
            throw new NotFoundException('Player not found');
        }

        const newRanks = this.calculateNewRanks(winner, loser, match.draw);

        winner.rank = newRanks.winnerRank;
        loser.rank = newRanks.loserRank;

        await this.playerRepository.save([winner, loser]);

        return {
            winner: { id: winner.id, rank: winner.rank },
            loser: { id: loser.id, rank: loser.rank },
        };
    }

    private calculateNewRanks(winner: Player, loser: Player, draw: boolean): { winnerRank: number; loserRank: number } {
        const K = 32;
        let winnerScore = 1;
        let loserScore = 0;

        if (draw) {
            winnerScore = 0.5;
            loserScore = 0.5;
        }

        const winnerExpectedScore = 1 / (1 + Math.pow(10, (loser.rank - winner.rank) / 400));
        const loserExpectedScore = 1 / (1 + Math.pow(10, (winner.rank - loser.rank) / 400));

        const winnerRank = winner.rank + K * (winnerScore - winnerExpectedScore);
        const loserRank = loser.rank + K * (loserScore - loserExpectedScore);

        return {
            winnerRank: Math.round(winnerRank),
            loserRank: Math.round(loserRank),
        };
    }
}
