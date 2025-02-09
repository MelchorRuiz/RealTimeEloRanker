import { Controller, Get, NotFoundException, Sse } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { Observable } from 'rxjs';
import { PlayerUpdatedEvent } from './ranking.events';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly eventEmitter: EventEmitter2
  ) { }

  @Get()
  async getRanking() {
    try {
      return await this.playersService.getPlayers();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Sse('events')
  getEvents(): Observable<any> {
    return new Observable(observer => {
      this.eventEmitter.on('player.updated', (event: PlayerUpdatedEvent) => {
        observer.next({
          event: 'RankingUpdate',
          data: {
            type: event.type,
            player: event.player
          }
        });
      });
    })
  }

}