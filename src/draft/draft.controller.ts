import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/config/transform.interceptor';
import { DraftService } from './draft.service';
import type { Response } from 'express';

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

  @Post('/image')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(FileInterceptor('image'))
  async postDraftImage(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) body,
  ) {
    return await this.draftService.postDraftImage(file, body.id);
  }

  @Put('/')
  async putDraft(@Body(ValidationPipe) body) {
    const { data } = body;
    return await this.draftService.postDraft(data, data.id);
  }
}
