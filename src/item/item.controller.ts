import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/config/transform.interceptor';
import type { Response } from 'express';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  // get all items or value items
  @Get('/')
  async getAllItems() {
    return this.itemService.GetItems();
  }

  // get excel file
  @Get('/file')
  async getFile(@Res({ passthrough: true }) res: Response) {
    return await this.itemService.getFile(res);
  }

  @Get('/limit/:limit/:page')
  async getLimitItems(
    @Param('limit') limit: string,
    @Param('page') page: string,
  ) {
    console.log('================================================');
    return await this.itemService.GetLimitItems(limit, page);
  }

  // Get One item
  @Get(':id')
  async getTestOneData(@Param('id') id: string) {
    console.log(1);

    return await this.itemService.GetItem(id);
  }

  // delete one item
  @Delete(':id')
  async deleteOneItems(@Param('id') id: string) {
    return await this.itemService.DeleteItem(id);
  }

  // put one item
  @Put(':id')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async PutItem(
    @UploadedFiles() file: Express.Multer.File,
    @Body(ValidationPipe) ItemData,
    @Param('id') id: string,
  ) {
    return await this.itemService.PutItem(ItemData, id, file);
  }

  @Post('/')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async PostItem(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body(ValidationPipe) ItemData,
  ) {
    return await this.itemService.PostItem(ItemData, files);
  }

  @Post('/posttest')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async PostTest(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body(ValidationPipe) ItemData,
  ) {
    return await this.itemService.testFormData(ItemData, files);
  }
}
