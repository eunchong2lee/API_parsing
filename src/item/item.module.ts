import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DraftService } from 'src/draft/draft.service';
import { Draft, DraftImage } from 'src/draft/entities/draft.entity';
import { File } from 'src/file/entities/file.entity';
import { FileService } from 'src/file/file.service';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthFoodData, File, Image, Draft, DraftImage]),
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_ACCOUNT_ACCESS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT_NAME'],
      containerName: 'nest-demo-container',
    }),
    JwtModule.register({
      secret: 'secure',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AzureStorageModule, TypeOrmModule],
  controllers: [ItemController],
  providers: [ItemService, FileService, ImageService, DraftService],
})
export class ItemModule {}
