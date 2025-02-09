import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Player],
  synchronize: true,
  logging: true,
};
