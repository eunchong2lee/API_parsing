import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { VtestService } from './vtest.service';

@Controller('vtest')
export class VtestController {
  constructor(private vtestService: VtestService) {}

  // 데이터 전부 받아오기
  @Get('/')
  async getvitamin() {
    return this.vtestService.getVitamin();
  }

  // json data db에 넣기
  @Post('/settings')
  async postvitamin() {
    return this.vtestService.postVitamin();
  }

  // data parsing
  @Post('/parse_standard')
  async parse_standard() {
    return this.vtestService.parse_standard();
  }

  // json 파일 만들기
  @Post('/jsondata')
  async comparedata() {
    return this.vtestService.compare_test_crawl();
  }
}
