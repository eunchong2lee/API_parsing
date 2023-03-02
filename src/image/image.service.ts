import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imagRepository: Repository<Image>,
  ) {}

  async getImages(id) {
    try {
      const images = await this.imagRepository.query(`
        SELECT *
        FROM image
        Where PRDUCT_ID = ${id}
        AND useYN='Y'`);

      return { images };
    } catch (e) {
      throw new BadRequestException(e.response);
    }
  }

  async postImages(images, id) {
    try {
      if (images.length) {
        const newImage = new Image();
        // 읽기 전용
        //   const stream = intoStream(optimized) as Readable;
        // const containerClient =
        //   blobServiceClient.getContainerClient(containerName);
        // const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // azure blob
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error('Azure Storage accountName not found');

        // Azure Storage resource key
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
        if (!accountKey) throw Error('Azure Storage accountKey not found');
        // Create credential
        const sharedKeyCredential = new StorageSharedKeyCredential(
          accountName,
          accountKey,
        );

        const baseUrl = `https://${accountName}.blob.core.windows.net/crawl/`;
        const containerName = `HealthFoodFile`;
        const blobServiceClient = new BlobServiceClient(
          `${baseUrl}`,
          sharedKeyCredential,
        );
        const containerClient = await blobServiceClient.getContainerClient(
          containerName,
        );

        images.map(async (image, index) => {
          const split_data = image.originalname.split('.');
          const extension = split_data[split_data.length - 1];
          const originalFileName = split_data[0];
          const changeFileName = Buffer.from(split_data[0], 'latin1').toString(
            'utf8',
          );
          const blockBlobClient =
            containerClient.getBlockBlobClient(changeFileName);
          await blockBlobClient.uploadData(image.buffer);
          const File = blockBlobClient.url;

          const size = image.size;

          //  https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/%EC%98%88%EC%8B%9C)%206%EB%85[…]82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1

          const split_File = File.split('/');
          const detailPathArray = [];
          for (let i = 5; i < split_data.length; i++) {
            detailPathArray.push(split_data[i]);
          }

          const detailPath = `/${detailPathArray.join('/')}`;
          const commonPath = `/${[split_data[3], split_data[4]].join('/')}`;

          newImage.image = File;
          newImage.size = size;
          newImage.originalFileName = originalFileName;
          newImage.changeFileName = changeFileName;
          newImage.extension = extension;
          newImage.detailPath = detailPath;
          newImage.commonPath = commonPath;
          newImage.PRDUCT_ID = id;

          await this.imagRepository.save(newImage);
        });
      }
    } catch (e) {
      throw new BadRequestException(e.response);
    }
  }

  async putImages(images: Array<Express.Multer.File>, id) {
    try {
      if (images.length) {
        const newImage = new Image();
        await this.imagRepository.query(`
          UPDATE Image
          SET useYN = "N"
          WHERE PRDUCT_ID = ${id}
        `);
        // 읽기 전용
        //   const stream = intoStream(optimized) as Readable;
        // const containerClient =
        //   blobServiceClient.getContainerClient(containerName);
        // const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // azure blob
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error('Azure Storage accountName not found');

        // Azure Storage resource key
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
        if (!accountKey) throw Error('Azure Storage accountKey not found');
        // Create credential
        const sharedKeyCredential = new StorageSharedKeyCredential(
          accountName,
          accountKey,
        );

        const baseUrl = `https://${accountName}.blob.core.windows.net/crawl/`;
        const containerName = `HealthFoodFile`;
        const blobServiceClient = new BlobServiceClient(
          `${baseUrl}`,
          sharedKeyCredential,
        );
        const containerClient = await blobServiceClient.getContainerClient(
          containerName,
        );

        images.map(async (image: any, index) => {
          if ('new' in image) {
            const split_data = image.originalname.split('.');
            const extension = split_data[split_data.length - 1];
            const originalFileName = split_data[0];
            const changeFileName = Buffer.from(
              split_data[0],
              'latin1',
            ).toString('utf8');
            const blockBlobClient =
              containerClient.getBlockBlobClient(changeFileName);
            await blockBlobClient.uploadData(image.buffer);
            const File = blockBlobClient.url;

            const size = image.size;

            //  https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/%EC%98%88%EC%8B%9C)%206%EB%85[…]82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1

            const split_File = File.split('/');
            const detailPathArray = [];
            for (let i = 5; i < split_data.length; i++) {
              detailPathArray.push(split_data[i]);
            }

            const detailPath = `/${detailPathArray.join('/')}`;
            const commonPath = `/${[split_data[3], split_data[4]].join('/')}`;

            newImage.image = File;
            newImage.size = size;
            newImage.originalFileName = originalFileName;
            newImage.changeFileName = changeFileName;
            newImage.extension = extension;
            newImage.detailPath = detailPath;
            newImage.commonPath = commonPath;
            newImage.PRDUCT_ID = id;

            await this.imagRepository.save(newImage);
          } else {
            await this.imagRepository.query(`
            UPDATE Image
            SET useYN = "Y"
            WHERE _id = ${image._id}
          `);
          }
        });
      }
      const returnImage = await this.imagRepository.query(`
      SELECT *
      FROM Image
      WHERE PRDUCT_ID = ${id}
      AND useYN = "Y"
      `);
      return returnImage;
    } catch (e) {
      throw new BadRequestException(e.response);
    }
  }
}
