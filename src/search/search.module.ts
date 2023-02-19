import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthFoodData]),
    JwtModule.register({
      secret: 'secure',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
