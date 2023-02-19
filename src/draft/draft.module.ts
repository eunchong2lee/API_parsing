import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DraftController } from './draft.controller';
import { DraftService } from './draft.service';
import { Draft, DraftImage } from './entities/draft.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Draft, DraftImage]),
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_ACCOUNT_ACCESS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT_NAME'],
      containerName: 'nest-demo-container',
    }),
  ],
  exports: [AzureStorageModule, TypeOrmModule],
  controllers: [DraftController],
  providers: [DraftService],
})
export class DraftModule {}
