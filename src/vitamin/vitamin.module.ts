import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vitamin } from './entities/vitamin.entity';
import { VitaminController } from './vitamin.controller';
import { VitaminService } from './vitamin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vitamin])],
  exports: [TypeOrmModule],
  controllers: [VitaminController],
  providers: [VitaminService],
})
export class VitaminModule {}
