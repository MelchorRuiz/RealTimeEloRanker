import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async addPlayer(name: string): Promise<Player> {
    const avgRank = await this.calculateAverageRank();
    const newPlayer = this.playerRepository.create({ id: name, rank: avgRank });
    return this.playerRepository.save(newPlayer);
  }

  async getPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  private async calculateAverageRank(): Promise<number> {
    const players = await this.playerRepository.find();
    if (players.length === 0) return 1000;
    const totalRank = players.reduce((sum, player) => sum + player.rank, 0);
    return totalRank / players.length;
  }
}
