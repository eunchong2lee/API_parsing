import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  // get all items
  @Get('/')
  async getAllItems() {
    return this.itemService.GetItems();
  }

  // // get one item
  // @Get(':id')
  // async getOneItems(@Param('id') id: string) {
  //   console.log('hello');
  //   return this.itemService.GetItem(id);
  // }

  @Get('/first')
  async getTestOneData() {
    console.log('hi');
    return this.itemService.testGetOneData();
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
  @UseInterceptors(FileInterceptor('image'))
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
    return this.itemService.testFormData(data, file);
  }
}
