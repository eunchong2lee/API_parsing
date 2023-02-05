import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/config/transform.interceptor';
import { DraftService } from './draft.service';

@Controller('draft')
export class DraftController {
  constructor(private draftService: DraftService) {}

  @Get('/:id')
  async getDraft(@Query('id') id: number) {
    return await this.draftService.getDraft(id);
  }

  @Post('/')
  async postDraft(@Body(ValidationPipe) body) {
    const { data } = body;
    return await this.draftService.postDraft(data, data.id);
  }
}
