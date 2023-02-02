import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from 'exceljs';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { CannotAttachTreeChildrenEntityError, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import type { Response } from 'express';
import { saveAs } from 'file-saver';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(HealthFoodData)
    private readonly ItemRepository: Repository<HealthFoodData>,
  ) {}

  // Get all items
  async GetItems() {
    try {
      // if (
      //   Object.keys(data_length).length === 0 &&
      //   data_length.constructor === Object
      // )
      console.log(' 모든 데이터 받아오기 실행');
      const items = await this.ItemRepository.query(
        `
              SELECT *
              FROM health_food_data`,
      );
      return { data: items };
    } catch (err) {
      console.log(err.message);
    }
  }

  // limit itmes
  async GetLimitItems(limit, page) {
    try {
      const first_page = Number(page - 1) * 10;
      const second_page = (Number(page - 1) + 1) * 10;
      const [items_length, items] = await Promise.all([
        this.ItemRepository.query(`
      SELECT *
      FROM health_food_data`),

        this.ItemRepository.query(`
      SELECT *
      FROM health_food_data
      WHERE _id > ${first_page}
      AND _id <= ${second_page}
      LIMIT ${limit}
      `),
      ]);

      return { data: { data: items, dataLength: items_length.length } };
    } catch (err) {
      console.log(err.message);
    }
  }

  // Get one item
  async GetItem(id) {
    try {
      const [item] = await this.ItemRepository.query(
        `SELECT *
            FROM health_food_data
            WHERE _id = "${id}"
            `,
      );

      return { data: item };
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
      ItemData = JSON.parse(ItemData.data);
      console.log(ItemData);

      if (file) {
        // upload image

        const extension = file.originalname.split('.').pop();
        const file_name = uuidv4() + '.' + extension;

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

      console.log(item);
      await this.ItemRepository.update(item._id, item);

      return { data: item, status: 200 };
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

      const item = await this.ItemRepository.query(
        `DELETE FROM health_food_data
                WHERE _id = '${id}'
                `,
      );
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
      ItemData = JSON.parse(ItemData.data);
      console.log(ItemData);
      const item = items[items.length - 1];
      const new_number = item._id + 1;

      const new_item = new HealthFoodData();

      if (file) {
        // 홍삼.png
        // 홍삼.jpg
        // upload image
        const split_data = file.originalname.split('.');
        console.log(split_data);
        const extension = split_data[0];
        console.log(extension);

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
        console.log('end1');

        await blockBlobClient.uploadData(file.buffer);
        const url = blockBlobClient.url;
        new_item.PRMS_IMG = url;
      }
      console.log('end2');

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
      console.log('end3');

      return { data: new_item };
    } catch (err) {
      console.log(err.message);
    }
    return 'hello';
  }

  async testFormData(data, file: Express.Multer.File) {
    try {
      console.log(file);
      console.log(data.data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async testGetOneData() {
    try {
      console.log(`1`);
      const [item] = await this.ItemRepository.query(
        `SELECT *
            FROM health_food_data
            WHERE _id = 1
            `,
      );
      console.log(item);
      return { data: item };
    } catch (err) {
      console.log(err);
    }
  }

  async getFile(res: Response) {
    try {
      const data = await this.ItemRepository.query(`
      SELECT *
      FROM health_food_data
      LIMIT 10`);

      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('My Sheet');
      const colums = [
        { header: '제품번호', key: 'STTEMNT_NO', width: 40 },
        { header: '제조사', key: 'ENTRPS', width: 40 },
        { header: '제품명', key: 'PRDUCT', width: 40 },
        { header: '등록번호', key: 'REGIST_DT', width: 40 },
        { header: '사용기간', key: 'DISTB_PD', width: 40 },
        { header: '성상', key: 'SUNGSANG', width: 40 },
        { header: '권유 섭취량', key: 'SRV_USE', width: 40 },
        { header: '보관장소', key: 'PRSRV_PD', width: 40 },
        { header: '주의사항', key: 'INTAKE_HINT1', width: 40 },
        { header: '상품정보', key: 'MAIN_FNCTN', width: 40 },
        { header: '기본성분', key: 'BASE_STANDARD', width: 40 },
        { header: '건강성분', key: 'PRMS_STANDARD', width: 40 },
        { header: '사용여부', key: 'useYN', width: 40 },
      ];
      worksheet.columns = colums;

      data.map((data, index) => {
        const {
          STTEMNT_NO,
          ENTRPS,
          PRDUCT,
          REGIST_DT,
          DISTB_PD,
          SUNGSANG,
          SRV_USE,
          PRSRV_PD,
          INTAKE_HINT1,
          MAIN_FNCTN,
          BASE_STANDARD,
          PRMS_STANDARD,
          useYN,
        } = data;
        worksheet.addRow({
          STTEMNT_NO,
          ENTRPS,
          PRDUCT,
          REGIST_DT,
          DISTB_PD,
          SUNGSANG,
          SRV_USE,
          PRSRV_PD,
          INTAKE_HINT1,
          MAIN_FNCTN,
          BASE_STANDARD,
          PRMS_STANDARD,
          useYN,
        });
      });
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'healthfooddata.xlsx',
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.log(err);
    }
  }
}
