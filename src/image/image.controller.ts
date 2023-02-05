import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/config/transform.interceptor';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  async GetImages(@Body() itemData) {
    return await this.imageService.getImages(itemData.id);
  }

  @Post()
  @UsePipes(TransformInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async PostImage(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() itemData,
  ) {
    return await this.imageService.postImages(images, itemData.id);
  }
}
