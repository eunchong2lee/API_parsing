import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VtestModule } from './vtest/vtest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { HttpModule } from '@nestjs/axios';
import { VtimgModule } from './vtimg/vtimg.module';
import { ItemModule } from './item/item.module';
import { APP_PIPE } from '@nestjs/core';

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
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
