import { Controller, Get, NotFoundException } from '@nestjs/common';
import { PlayersService } from '../players/players.service';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getRanking() {
    try {
      return await this.playersService.getPlayers();
    } catch (error) {
      throw new NotFoundException(error.message); // Lanzamos un error 404 si no hay jugadores
    }
  }
}