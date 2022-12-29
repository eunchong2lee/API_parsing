import { Controller, Delete, Get, Put } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  // get all items
  @Get('/')
  async getAllItems() {
    return this.itemService.GetItems();
  }

  // get one item
  @Get('/one')
  async getOneItems() {
    return this.itemService.GetItem();
  }

  // put one item
  @Put('/')
  async putOneItems() {
    return this.itemService.PutItem();
  }

  // delete one item
  @Delete('/')
  async deleteOneItems() {
    return this.itemService.DeleteItem();
  }
}
