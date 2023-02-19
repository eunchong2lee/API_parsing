import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
import { itemRegisterDto } from './dto/itemRegister.dto';

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
  async getFile(
    @Query('tab') tab: string,
    @Query('name') name: string,
    @Query('date') date: string,
    @Query('useYN') useYN: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.itemService.getFile(tab, name, date, useYN, res);
  }

  @Get('/limit/:limit/:page')
  async getLimitItems(
    @Param('limit') limit: string,
    @Param('page') page: string,
  ) {
    return await this.itemService.GetLimitItems(limit, page);
  }

  // Get One item
  @Get(':id')
  async getTestOneData(@Param('id') id: string) {
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
  @UseInterceptors(AnyFilesInterceptor())
  async PutItem(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body(ValidationPipe) itemData,
    @Param('id') id: string,
  ) {
    return await this.itemService.PutItem(itemData, id, files);
  }

  @Post('/')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async PostItem(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body(ValidationPipe) itemData: itemRegisterDto,
  ) {
    console.log(itemData);
    return await this.itemService.PostItem(itemData, files);
  }
}
