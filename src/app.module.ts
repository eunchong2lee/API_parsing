import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VitaminController } from './vitamin/vitamin.controller';
import { VtestController } from './vtest/vtest.controller';

import { VitaminService } from './vitamin/vitamin.service';
import { VtestService } from './vtest/vtest.service';

import { VitaminModule } from './vitamin/vitamin.module';
import { VtestModule } from './vtest/vtest.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    VitaminModule,
    VtestModule,
    TypeOrmModule.forRoot(typeORMConfig),
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [AppController, VitaminController, VtestController],
  providers: [AppService, VitaminService, VtestService],
})
export class AppModule {}
