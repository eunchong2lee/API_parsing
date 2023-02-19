import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from './entities/HealthFoodData.entity';
import { HealthFoodDataController } from './health-food-data.controller';
import { HeatlFoodDataService } from './health-food-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthFoodData]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 20000000,
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [HealthFoodDataController],
  providers: [HeatlFoodDataService],
})
export class VtestModule {}
