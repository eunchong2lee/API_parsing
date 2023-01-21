import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthFoodData])],
  exports: [TypeOrmModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
