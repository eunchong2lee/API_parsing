import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('/')
  async getHealthFoodAnalytics() {
    return this.analyticsService.getHealthFoodAnalytics();
  }
}
