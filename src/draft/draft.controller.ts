import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DraftService } from './draft.service';

@Controller('draft')
export class DraftController {
  constructor(private draftService: DraftService) {}

  @Get('/')
  async getDraft(@Query('id') id: number) {
    return await this.draftService.getDraft(id);
  }

  @Post('/')
  async postDraft(@Body(ValidationPipe) body) {
    const { data } = body;
    console.log(data);
    return await this.draftService.postDraft(data);
  }
}
