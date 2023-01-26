import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserActivityService } from './user-activity.service';

@Controller('user-activity')
export class UserActivityController {
  constructor(private userActivityService: UserActivityService) {}

  @Post(':account')
  async postUserActivity(
    @Param('account') account: string,
    @Body(ValidationPipe) Data,
  ) {
    const { page } = Data;
    return await this.userActivityService.postUserActivity(account, page);
  }

  @Get('/total')
  async getUserTotalActivity() {
    return await this.userActivityService.getUserTotalActivity();
  }

  @Get()
  async getUserRelationActivity(@Query('page') page: string) {
    return await this.userActivityService.getUserRelationActivity();
  }
}
