import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/vtest/entities/vtest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(HealthFoodData)
    private readonly ItemRepository: Repository<HealthFoodData>,
  ) {}

  // Get all items
  async GetItems() {
    try {
      const items = await this.ItemRepository.query(
        `
            SELECT *
            FROM health_food_data`,
      );
      return items;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Get one item
  async GetItem() {
    try {
      const num = 1;

      const item = await this.ItemRepository.query(
        `SELECT *
            FROM health_food_data
            WHERE _id = 1
            `,
      );
      return item;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Put one item
  async PutItem() {
    try {
      const image = 0;
      const [item] = await this.ItemRepository.query(
        `SELECT *
              FROM health_food_data
              WHERE _id = 123
              `,
      );

      if (image) {
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
        const containerName = `HealthFoodData`;
        const blobServiceClient = new BlobServiceClient(
          `${baseUrl}`,
          sharedKeyCredential,
        );
        const containerClient = await blobServiceClient.getContainerClient(
          containerName,
        );
        console.log('setting container client ===========');

        const blockBlobClient = containerClient.getBlockBlobClient(item.PRDUCT);

        // await blockBlobClient.uploadData('1');
        const url = blockBlobClient.url;
        item.PRMS_IMG = url;
      }

      // data 수정
      // ex) 예시
      const parse = JSON.parse(item.PRMS_STANDARD);
      parse['칼슘'] = '270mg';

      item.PRMS_STANDARD = parse;
      await this.ItemRepository.update(item._id, item);

      return 'complete';
    } catch (err) {
      console.log(err.message);
    }
  }

  // Delete One Item
  async DeleteItem() {
    try {
      const num = 1;

      const item = await this.ItemRepository.query(
        `DELETE FROM health_food_data
              WHERE _id = '${num}'
              `,
      );
      return '삭제완료';
    } catch (err) {
      console.log(err.message);
    }
  }
}
