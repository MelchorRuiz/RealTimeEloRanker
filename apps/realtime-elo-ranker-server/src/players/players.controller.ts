import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity'; 

@Controller('api/player')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async addPlayer(@Body('id') name: string): Promise<Player> {
    try {
      const player = await this.playersService.addPlayer(name);
      return player;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  getAllPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }
}
