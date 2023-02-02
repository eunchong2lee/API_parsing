import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(HealthFoodData)
    private ItemRepository: Repository<HealthFoodData>,
  ) {}

  async searchInfo(tab, name, date, useYN, page, limit) {
    try {
      const searchLimit = limit
        ? `Limit ${limit} OFFSET ${(page - 1) * 10}`
        : ``;
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

      const [items, totalItems] = await Promise.all([
        this.ItemRepository.query(`
          SELECT *
          FROM health_food_data
          WHERE ${searchTab} like "%${searchName}%"
          AND REGIST_DT >= ${firstDate}
          AND ${secondDate} >= REGIST_DT
          ${searchUseYN}
          ${searchLimit}
          `),
        this.ItemRepository.query(`
          SELECT *
          FROM health_food_data
          WHERE ${searchTab} like "%${searchName}%"
          AND REGIST_DT >= ${firstDate}
          AND ${secondDate} >= REGIST_DT
          ${searchUseYN}
        `),
      ]);
      const itemsLength = totalItems.length;
      return { data: { data: items, dataLength: itemsLength } };
    } catch (err) {
      console.log(err.message);
    }
  }
}
