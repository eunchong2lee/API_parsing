import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserActivityRelation,
  UserActivityTotalRelation,
} from './entities/user-activity-relation.entity';
import { UserActivity } from './entities/user-activity.entity';
import { UserActivityController } from './user-activity.controller';
import { UserActivityService } from './user-activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserActivity,
      UserActivityRelation,
      UserActivityTotalRelation,
    ]),
    JwtModule.register({
      secret: 'secure',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserActivityController],
  providers: [UserActivityService],
})
export class UserActivityModule {}
