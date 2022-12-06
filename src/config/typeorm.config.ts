import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TEST_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  autoLoadEntities: true,
  synchronize: true,
};
