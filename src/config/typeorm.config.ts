import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.NEW_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.NEW_USERNAME,
  password: process.env.NEW_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  autoLoadEntities: true,
  synchronize: true,
};
