import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vtest } from './entities/vtest.entity';
import { VtestController } from './vtest.controller';
import { VtestService } from './vtest.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vtest]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 20000000,
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [VtestController],
  providers: [VtestService],
})
export class VtestModule {}
