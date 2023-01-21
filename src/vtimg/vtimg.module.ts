import { HttpModule } from '@nestjs/axios';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { VtimgController } from './vtimg.controller';
import { VtimgService } from './vtimg.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthFoodData]),
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_ACCOUNT_ACCESS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT_NAME'],
      containerName: 'nest-demo-container',
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 20000000,
        maxRedirects: 5,
      }),
    }),
  ],
  exports: [AzureStorageModule, TypeOrmModule],
  controllers: [VtimgController],
  providers: [VtimgService],
})
export class VtimgModule {}
