import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthFoodData, File, Image]),
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_ACCOUNT_ACCESS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT_NAME'],
      containerName: 'nest-demo-container',
    }),
  ],
  exports: [AzureStorageModule, TypeOrmModule],
  controllers: [ItemController],
  providers: [ItemService, FileService, ImageService],
})
export class ItemModule {}
