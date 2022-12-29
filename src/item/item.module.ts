import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/vtest/entities/vtest.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthFoodData]),
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_ACCOUNT_ACCESS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT_NAME'],
      containerName: 'nest-demo-container',
    }),
  ],
  exports: [AzureStorageModule, TypeOrmModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
