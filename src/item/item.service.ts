import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from 'exceljs';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Repository } from 'typeorm';
import type { Response } from 'express';
import { ImageService } from 'src/image/image.service';
import { FileService } from 'src/file/file.service';
import { DraftService } from 'src/draft/draft.service';
import { itemRegisterDto } from './dto/itemRegister.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(HealthFoodData)
    private readonly ItemRepository: Repository<HealthFoodData>,
    private imageService: ImageService,
    private fileService: FileService,
    private draftService: DraftService,
  ) {}

  // Get all items
  async GetItems() {
    try {
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

      const draft = await this.draftService.getDraft(id);
      const files = await this.fileService.getFiles(id);
      const images = await this.imageService.getImages(id);

      return { data: { item, draft, files, images } };
    } catch (err) {
      console.log(err.message);
    }
  }

  // multer upload image
  async PutItem(ItemData, id, files: Array<Express.Multer.File>) {
    try {
      // await this.ItemRepository.update();
      console.log(id);
      const [item] = await this.ItemRepository.query(
        `SELECT *
          FROM health_food_data
          WHERE _id = ${id}
          `,
      );

      // ItemData = JSON.parse(ItemData.data);
      console.log(ItemData);

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
      item.PRMS_STANDARD = JSON.parse(ItemData.PRMS_STANDARD);

      const filesArray = [];
      const imagesArray = [];

      files.map((file, i) => {
        if (file.fieldname === 'images') {
          imagesArray.push(file);
        } else if (file.fieldname === 'files') {
          filesArray.push(file);
        }
      });

      const [file, image, draft] = await Promise.all([
        this.fileService.putFiles(filesArray, id),
        this.imageService.putImages(imagesArray, id),
        this.draftService.putDraft(ItemData.draft, id),
      ]);

      await this.ItemRepository.update(item._id, item);

      const [newData] = await this.ItemRepository.query(`
      SELECT *
          FROM health_food_data
          WHERE _id = ${id}
      `);

      return {
        data: { item: newData, file: file, draft: draft, image: image },
        status: 200,
      };
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
  async PostItem(body: itemRegisterDto, files: Array<Express.Multer.File>) {
    try {
      console.log('body', body);
      // console.log('fils', files);
      const newItem = await this.ItemRepository.save({
        STTEMNT_NO: body.STTEMNT_NO,
        ENTRPS: body.ENTRPS,
        PRDUCT: body.PRDUCT,
        REGIST_DT: body.REGIST_DT,
        DISTB_PD: body.DISTB_PD,
        SUNGSANG: body.SUNGSANG,
        SRV_USE: body.SRV_USE,
        PRSRV_PD: body.PRSRV_PD,
        INTAKE_HINT1: body.INTAKE_HINT1,
        MAIN_FNCTN: body.MAIN_FNCTN,
        BASE_STANDARD: body.BASE_STANDARD,
        PRMS_STANDARD: JSON.parse(body.PRMS_STANDARD),
      });

      // file 분할
      const filesArray = [];
      const imagesArray = [];

      files.map((file, i) => {
        if (file.fieldname === 'images') {
          imagesArray.push(file);
        } else if (file.fieldname === 'files') {
          filesArray.push(file);
        }
      });

      console.log(filesArray);
      console.log(imagesArray);

      // 파일 저장
      if (newItem._id) {
        await Promise.all([
          this.fileService.postFiles(filesArray, newItem._id),
          this.imageService.postImages(imagesArray, newItem._id),
          this.draftService.postDraft(body.draft, newItem._id),
        ]);
      }

      return { data: newItem };
    } catch (err) {
      console.log(err.message);
    }
    return 'hello';
  }

  // excel file 받기
  async getFile(tab, name, date, useYN, res: Response) {
    try {
      const searchUseYN = useYN == 'E' ? `` : `AND useYN = "${useYN}"`;

      // tab 확인
      let searchTab = '';
      if (tab === 'PRDUCT') {
        searchTab = 'PRDUCT';
      } else if (tab === 'STTEMNT_NO') {
        searchTab = 'STTEMNT_NO';
      } else if (tab === 'ENTRPS') {
        searchTab = 'ENTRPS';
      }

      // 검색 확인
      let searchName = '';
      if (name) {
        searchName = name;
      }

      let firstDate = '00000000';
      let secondDate = '99999999';

      // 날짜 파싱
      if (date) {
        const splitDate = date.split('~');
        firstDate = splitDate[0];
        firstDate = firstDate.split('-').join('');
        secondDate = splitDate[1];
        secondDate = secondDate.split('-').join('');
      }

      const data = await this.ItemRepository.query(`
          SELECT *
          FROM health_food_data
          WHERE ${searchTab} like "%${searchName}%"
          AND REGIST_DT >= ${firstDate}
          AND ${secondDate} >= REGIST_DT
          ${searchUseYN}
          `);

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

  async UseNo() {
    return 'hello';
  }
}
