import { Module } from '@nestjs/common';
import { PlayersModule } from 'src/players/players.module';
import { RankingController } from './ranking.controller';

@Module({
  imports: [PlayersModule],
  controllers: [RankingController],
})
export class RankingModule {}
