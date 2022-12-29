import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VtestController } from './vtest/vtest.controller';

import { VtestService } from './vtest/vtest.service';

import { VtestModule } from './vtest/vtest.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { HttpModule } from '@nestjs/axios';
import { VtimgModule } from './vtimg/vtimg.module';
import { VtimgController } from './vtimg/vtimg.controller';
import { VtimgService } from './vtimg/vtimg.service';
import { PuppeteerModule } from 'nest-puppeteer';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    VtestModule,
    VtimgModule,
    TypeOrmModule.forRoot(typeORMConfig),
    HttpModule.register({
      timeout: 5000,
    }),
    ItemModule,
  ],
  controllers: [AppController, ItemController],
  providers: [AppService, ItemService],
})
export class AppModule {}
