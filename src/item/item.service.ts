import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/vtest/entities/vtest.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
  async GetItem(id) {
    try {
      const item = await this.ItemRepository.query(
        `SELECT *
            FROM health_food_data
            WHERE _id = "${id}"
            `,
      );
      return item;
    } catch (err) {
      console.log(err.message);
    }
  }

  // multer upload image
  async PutItem(ItemData, id, file: Express.Multer.File) {
    try {
      const [item] = await this.ItemRepository.query(
        `SELECT *
                    FROM health_food_data
                    WHERE _id = "${id}"
                    `,
      );

      if (file) {
        // upload image
        const extension = file.originalname.split('.').pop();
        const file_name = uuidv4() + '.' + extension;

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

        await blockBlobClient.uploadData(file.buffer);
        const url = blockBlobClient.url;
        item.PRMS_IMG = url;
      }

      // data 수정
      item.STTEMNT_NO = ItemData.STTEMNT_NO;
      item.ENTRPS = ItemData.ENTRPS;
      item.PRDUCT = ItemData.PRDUCT;
      item.REGIST_DT = ItemData.REGIST_DT;
      item.DISTB_PD = ItemData.DISTB_PD;
      item.SUNGSANG = ItemData.SUNGSANG;
      item.SRV_USE = ItemData.SRV_USE;
      item.PRSRV_PD = ItemData.PRSRV_PD;
      item.INTAKE_HINT1 = ItemData.INTAKE_HINT1;
      item.MAIN_FNCTN = ItemData.MAIN_FNCTN;
      item.BASE_STANDARD = ItemData.BASE_STANDARD;
      item.PRMS_STANDARD = ItemData.PRMS_STANDARD;

      await this.ItemRepository.update(item._id, item);

      return item;
    } catch (err) {
      console.log(err.message);
    }
  }

  // Delete One Item
  async DeleteItem(id) {
    try {
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
      const containerName = `HealthFoodData`;
      const blobServiceClient = new BlobServiceClient(
        `${baseUrl}`,
        sharedKeyCredential,
      );
      const containerClient = await blobServiceClient.getContainerClient(
        containerName,
      );
      //   azure file 삭제
      const blockBlobClient = await containerClient.getBlockBlobClient(
        'https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/6%EB%85%84%EA%B7%BC%EA%B3%A0%EB%A0%A4%ED%99%8D%EC%82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1',
      );
      await blockBlobClient.deleteIfExists();

      //   const item = await this.ItemRepository.query(
      //     `DELETE FROM health_food_data
      //           WHERE _id = '${id}'
      //           `,
      //   );
      return '삭제완료';
    } catch (err) {
      console.log(err.message);
    }
  }

  //Post
  async PostItem(ItemData, file: Express.Multer.File) {
    try {
      // _id 만들기
      const items = await this.ItemRepository.query(
        `SELECT * 
        FROM health_food_data`,
      );
      const item = items[items.length - 1];
      const new_number = item._id + 1;

      const new_item = new HealthFoodData();

      if (file) {
        // upload image
        const extension = file.originalname.split('.').pop();
        const file_name = uuidv4() + '.' + extension;

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
        const containerName = `HealthFoodData`;
        const blobServiceClient = new BlobServiceClient(
          `${baseUrl}`,
          sharedKeyCredential,
        );
        const containerClient = await blobServiceClient.getContainerClient(
          containerName,
        );
        console.log('setting container client ===========');

        const blockBlobClient = containerClient.getBlockBlobClient(
          ItemData.PRDUCT,
        );

        await blockBlobClient.uploadData(file.buffer);
        const url = blockBlobClient.url;
        new_item.PRMS_IMG = url;
      }

      new_item._id = new_number;
      new_item.STTEMNT_NO = ItemData.STTEMNT_NO;
      new_item.ENTRPS = ItemData.ENTRPS;
      new_item.PRDUCT = ItemData.PRDUCT;
      new_item.REGIST_DT = ItemData.REGIST_DT;
      new_item.DISTB_PD = ItemData.DISTB_PD;
      new_item.SUNGSANG = ItemData.SUNGSANG;
      new_item.SRV_USE = ItemData.SRV_USE;
      new_item.PRSRV_PD = ItemData.PRSRV_PD;
      new_item.INTAKE_HINT1 = ItemData.INTAKE_HINT1;
      new_item.MAIN_FNCTN = ItemData.MAIN_FNCTN;
      new_item.BASE_STANDARD = ItemData.BASE_STANDARD;
      new_item.PRMS_STANDARD = ItemData.PRMS_STANDARD;

      await this.ItemRepository.save(new_item);

      return item;
    } catch (err) {
      console.log(err.message);
    }
    return 'hello';
  }
}
