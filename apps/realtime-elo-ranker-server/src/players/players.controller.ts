import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity'; 

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  addPlayer(@Body('name') name: string): Promise<Player> {
    return this.playersService.addPlayer(name);
  }

  @Get()
  getAllPlayers(): Promise<Player[]> {
    return this.playersService.getPlayers();
  }
}
