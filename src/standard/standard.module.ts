import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Standard } from './entities/standard.entity';
import { StandardController } from './standard.controller';
import { StandardService } from './standard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Standard, HealthFoodData]),
    JwtModule.register({
      secret: 'secure',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [StandardController],
  providers: [StandardService],
})
export class StandardModule {}
