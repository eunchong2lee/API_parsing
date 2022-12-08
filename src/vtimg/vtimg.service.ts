import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as puppeteer from 'puppeteer';
import { HealthFoodData } from 'src/vtest/entities/vtest.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { uuid } from 'uuidv4';
import {
  BlobServiceClient,
  BlockBlobClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Injectable()
export class VtimgService {
  constructor(
    @InjectRepository(HealthFoodData)
    private readonly VtestRepository: Repository<HealthFoodData>,
    private readonly httpService: HttpService,
  ) {}

  async postimage() {
    try {
      const datas = await this.VtestRepository.query(
        `
            SELECT *
            FROM health_food_data`,
      );
      // Azure Storage resource name
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
      const browser = await puppeteer.launch({ headless: true });
      for (let i = 370; i < datas.length / 10; i++) {
        const new_datas = datas.slice(i * 10, 10 + i * 10);
        console.log(new_datas.length, i, datas.length);
        for (const data of new_datas) {
          // new_datas.forEach(async (data) => {
          if (data.PRMS_IMG == null && data.PRDUCT != null) {
            const blockBlobClient = containerClient.getBlockBlobClient(
              data.PRDUCT,
            );
            const URL = `https://www.google.com`;
            const page = await browser.newPage();
            try {
              await page.goto(URL);
              await page.reload();

              await page.click('.SDkEP .a4bIc .gLFyf');
              await page.keyboard.type(`${data.PRDUCT}`);
              await page.keyboard.press('Enter');

              await page.waitForNavigation();
              console.log(data._id);

              await page.click(
                '#hdtb-msb > div:nth-child(1) > div > div:nth-child(2) > a > span',
              );

              await page.waitForNavigation();
              const result = await page.evaluate(() => {
                // let img;
                const img = document
                  .querySelector('a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img')
                  .getAttribute('src');
                // if (imgEl) {
                //   img = imgEl.src;
                // }
                //#islrg > div.islrc > div:nth-child(2) > a.wXeWr.islib.nfEiy > div.bRMDJf.islir
                return { img };
              });
              let url;
              console.log(1);
              if (result.img) {
                console.log(2);
                const imgResult = await this.httpService.axiosRef.get(
                  result.img.replace(/\?.*$/, ''),
                  {
                    responseType: 'arraybuffer',
                  },
                );

                console.log(3);

                // fs.writeFileSync(`poster/${data.PRDUCT}.jpg`, imgResult.data);
                await blockBlobClient.uploadData(imgResult.data);
                url = blockBlobClient.url;
                data.PRMS_IMG = url;
                console.log(url);
                await this.VtestRepository.update(data._id, data);
              }
            } catch (e) {
              console.log(e.message);
            }

            await page.close();
          }
        }
        // );
      }

      await browser.close();

      return 'complete';
    } catch (e) {
      console.log(e.message);
    }
  }
}
