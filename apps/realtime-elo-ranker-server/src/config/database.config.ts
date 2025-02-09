import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
  logging: true,
};
