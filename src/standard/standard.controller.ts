import { Controller, Get, Post, Query } from '@nestjs/common';
import { StandardService } from './standard.service';

@Controller('standard')
export class StandardController {
  constructor(private readonly standardService: StandardService) {}

  @Post()
  async setStandard() {
    return await this.standardService.setStandard();
  }

  @Get()
  async getStandard(@Query('name') name: string) {
    return await this.standardService.getStandard(name);
  }
}
