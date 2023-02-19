import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HeatlFoodDataService } from './health-food-data.service';

@Controller('health-food-data')
export class HealthFoodDataController {
  constructor(private heatlFoodDataService: HeatlFoodDataService) {}

  // json data db에 넣기
  @Post('/settings')
  async postvitamin() {
    return this.heatlFoodDataService.postVitamin();
  }

  // data parsing
  @Post('/parse_standard')
  async parse_standard() {
    return this.heatlFoodDataService.parse_standard();
  }

  // json 파일 만들기
  @Post('/jsondata')
  async comparedata() {
    return this.heatlFoodDataService.compare_test_crawl();
  }
}
