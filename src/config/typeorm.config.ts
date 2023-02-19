import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { AdminUserEntity } from 'src/auth/entities/auth.entity';
import { Draft, DraftImage } from 'src/draft/entities/draft.entity';
import { File } from 'src/file/entities/file.entity';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Image } from 'src/image/entities/image.entity';
import { Standard } from 'src/standard/entities/standard.entity';
import {
  UserActivityRelation,
  UserActivityTotalRelation,
} from 'src/user-activity/entities/user-activity-relation.entity';
import { UserActivity } from 'src/user-activity/entities/user-activity.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TEST_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    AdminUserEntity,
    Draft,
    DraftImage,
    File,
    HealthFoodData,
    Image,
    Standard,
    UserActivityRelation,
    UserActivity,
    UserActivityTotalRelation,
  ],
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  ssl: {
    // test 시 false, main mysql 시 true
    rejectUnauthorized: false,
  },
  autoLoadEntities: false,
  synchronize: true,
};
