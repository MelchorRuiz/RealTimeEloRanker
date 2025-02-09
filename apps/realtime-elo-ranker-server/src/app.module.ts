import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PlayersModule } from './players/players.module';
import { MatchModule } from './match/match.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PlayersModule,
    MatchModule,
    RankingModule
  ],
})
export class AppModule {}
