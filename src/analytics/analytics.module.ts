import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/auth/entities/auth.entity';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
@Module({
  imports: [TypeOrmModule.forFeature([HealthFoodData, AdminUserEntity])],
  exports: [TypeOrmModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
