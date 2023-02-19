import { AzureStorageFileInterceptor } from '@nestjs/azure-storage';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get('/:id')
  async GetFiles(@Query('id') id: number) {
    return await this.fileService.getFiles(id);
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

  @Put(':id')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async PutFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
  ) {
    return await this.fileService.putFiles(files, id);
  }
}
