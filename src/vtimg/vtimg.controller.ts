import {
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VtimgService } from './vtimg.service';

@Controller('vtimg')
export class VtimgController {
  constructor(
    private readonly azureStorage: AzureStorageService,
    private vtimgService: VtimgService,
  ) {}

  @Post('/images')
  async update_image() {
    return await this.vtimgService.postimage();
  }

  @Post('azure/upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFilesUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    file = {
      ...file,
      originalname: 'foo-bar.txt',
    };
    const storageUrl = await this.azureStorage.upload(file);
    Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
  }
}
