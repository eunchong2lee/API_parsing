import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
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
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
