import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/config/transform.interceptor';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  // get all items or value items
  @Get('/')
  async getAllItems() {
    return this.itemService.GetItems();
  }

  // 성분 받아오기
  @Get('/standard')
  async getStandard() {
    return this.itemService.GetStandard();
  }

  @Get('/limit/:limit/:page')
  async getLimitItems(
    @Param('limit') limit: string,
    @Param('page') page: string,
  ) {
    console.log('================================================');
    return this.itemService.GetLimitItems(limit, page);
  }

  // Get One item
  @Get(':id')
  async getTestOneData(@Param('id') id: string) {
    console.log(1);

    return this.itemService.GetItem(id);
  }

  // delete one item
  @Delete(':id')
  async deleteOneItems(@Param('id') id: string) {
    return this.itemService.DeleteItem(id);
  }

  // put one item
  @Put(':id')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async PutItem(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) ItemData,
    @Param('id') id: string,
  ) {
    return this.itemService.PutItem(ItemData, id, file);
  }

  @Post('/')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  async PostItem(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) ItemData,
  ) {
    return this.itemService.PostItem(ItemData, file);
  }

  @Post('/test')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  async PostFormData(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) data,
  ) {
    console.log(data);
    // return this.itemService.testFormData(data, file);
  }
}
