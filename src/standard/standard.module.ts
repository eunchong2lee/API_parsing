import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Standard } from './entities/standard.entity';
import { StandardController } from './standard.controller';
import { StandardService } from './standard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Standard, HealthFoodData])],
  controllers: [StandardController],
  providers: [StandardService],
})
export class StandardModule {}
