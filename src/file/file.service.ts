import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { v4 as uuidv4 } from 'uuid';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async getFiles(id) {
    const files = await this.fileRepository.query(`
    SELECT *
    FROM File
    WHERE PRDUCT_ID = "${id}"
    AND useYN = 'Y'
    `);
    return { files };
  }

  async postFiles(files, id) {
    try {
      if (files.length) {
        const new_File = new File();
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

        files.map(async (file, index) => {
          const split_data = file.originalname.split('.');
          const extension = split_data[split_data.length - 1];
          const originalFileName = split_data[0];
          const changeFileName = Buffer.from(split_data[0], 'latin1').toString(
            'utf8',
          );
          const blockBlobClient =
            containerClient.getBlockBlobClient(changeFileName);
          await blockBlobClient.uploadData(file.buffer);
          const File = blockBlobClient.url;

          const size = file.size;

          //  https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/%EC%98%88%EC%8B%9C)%206%EB%85[…]82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1

          const split_File = File.split('/');
          const detailPathArray = [];
          for (let i = 5; i < split_data.length; i++) {
            detailPathArray.push(split_data[i]);
          }

          const detailPath = `/${detailPathArray.join('/')}`;
          const commonPath = `/${[split_data[3], split_data[4]].join('/')}`;

          new_File.File = File;
          new_File.size = size;
          new_File.originalFileName = originalFileName;
          new_File.changeFileName = changeFileName;
          new_File.extension = extension;
          new_File.detailPath = detailPath;
          new_File.commonPath = commonPath;
          new_File.PRDUCT_ID = id;

          await this.fileRepository.save(new_File);
        });
      }
      return 'complete';
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }

  async putFiles(files: Array<Express.Multer.File>, id) {
    try {
      if (files.length) {
        const new_File = new File();
        await this.fileRepository.query(`
          UPDATE File
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
        files.map(async (file: any, index) => {
          if ('new' in file) {
            const split_data = file.originalname.split('.');
            const extension = split_data[split_data.length - 1];
            const originalFileName = split_data[0];
            const changeFileName = Buffer.from(
              split_data[0],
              'latin1',
            ).toString('utf8');
            const blockBlobClient =
              containerClient.getBlockBlobClient(changeFileName);
            await blockBlobClient.uploadData(file.buffer);
            const File = blockBlobClient.url;

            const size = file.size;

            //  https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/%EC%98%88%EC%8B%9C)%206%EB%85[…]82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1

            const split_File = File.split('/');
            const detailPathArray = [];
            for (let i = 5; i < split_data.length; i++) {
              detailPathArray.push(split_data[i]);
            }

            const detailPath = `/${detailPathArray.join('/')}`;
            const commonPath = `/${[split_data[3], split_data[4]].join('/')}`;

            new_File.File = File;
            new_File.size = size;
            new_File.originalFileName = originalFileName;
            new_File.changeFileName = changeFileName;
            new_File.extension = extension;
            new_File.detailPath = detailPath;
            new_File.commonPath = commonPath;
            new_File.PRDUCT_ID = id;

            await this.fileRepository.save(new_File);
          } else {
            await this.fileRepository.query(`
              UPDATE File
              SET useYN = "Y"
              WHERE _id = ${file._id}
          `);
          }
        });
      }
      const returnFile = await this.fileRepository.query(`
      SELECT *
      FROM File
      WHERE PRDUCT_ID = ${id}
      AND useYN = "Y"`);
      return returnFile;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }
}
