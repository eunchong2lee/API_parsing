import { AzureStorageFileInterceptor } from '@nestjs/azure-storage';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/config/transform.interceptor';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  async GetFiles() {
    return await this.fileService.getFiles();
  }

  @Post()
  @UsePipes(TransformInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async PostFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() itemData,
  ) {
    return await this.fileService.postFiles(files, itemData.id);
  }

  @Put()
  async PutFiles() {
    return await this.fileService.putFiles();
  }
}
