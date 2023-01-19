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

  @Get('/')
  async getDraft(@Query('id') id: number) {
    return await this.draftService.getDraft(id);
  }

  @Post('/file')
  @UsePipes(TransformInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  async postFile(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) ItemData,
  ) {
    console.log(ItemData);
    console.log(1);
    console.log(file);
    return await this.draftService.postFile(file);
  }

  @Post('/')
  async postDraft(@Body(ValidationPipe) body) {
    const { data } = body;
    console.log(data);
    return await this.draftService.postDraft(data);
  }
}
