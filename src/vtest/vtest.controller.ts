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

  @Get('/one')
  async getonevitamin() {
    return this.vtestService.get_one_data();
  }

  // json data db에 넣기
  @Post('/')
  async postvitamin() {
    return this.vtestService.postVitamin();
  }

  @Get('/parse_standard')
  async parse_standard() {
    return this.vtestService.parse_standard();
  }

  @Get('/parse_clone')
  async parse_clone() {
    return this.vtestService.clone_parse();
  }

  // json 파일 만들기
  @Get('/jsondata')
  async comparedata() {
    return this.vtestService.compare_test_crawl();
  }

  // json 파일 받아오기
  @Get('/json')
  async jsonlength() {
    return this.vtestService.test_json();
  }
}
