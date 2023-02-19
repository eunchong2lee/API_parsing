import { AzureStorageModule } from '@nestjs/azure-storage';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
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
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
