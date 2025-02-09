import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    PlayersModule
  ],
})
export class AppModule {}
