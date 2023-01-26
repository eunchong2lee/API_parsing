import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VtestModule } from './HealthFoodData/vtest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { HttpModule } from '@nestjs/axios';
import { VtimgModule } from './vtimg/vtimg.module';
import { ItemModule } from './item/item.module';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DraftController } from './draft/draft.controller';
import { DraftService } from './draft/draft.service';
import { DraftModule } from './draft/draft.module';
import { StandardModule } from './standard/standard.module';
import { FileModule } from './file/file.module';
import { UserActivityModule } from './user-activity/user-activity.module';

@Module({
  imports: [
    VtestModule,
    VtimgModule,
    TypeOrmModule.forRoot(typeORMConfig),
    HttpModule.register({
      timeout: 5000,
    }),
    ItemModule,
    AuthModule,
    SearchModule,
    AnalyticsModule,
    DraftModule,
    StandardModule,
    FileModule,
    UserActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
