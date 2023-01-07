import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/vtest/entities/vtest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(HealthFoodData)
    private ItemRepository: Repository<HealthFoodData>,
  ) {}

  async searchInfo(tab, name, date, useYN, limit) {
    try {
      console.log(tab, name, date, useYN, limit);
      // 처음데이터
      const searchLimit = limit ? `Limit ${limit}` : ``;
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

      // 사용 여부 확인
      const searchuseYN = useYN;

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
      console.log(firstDate, secondDate);

      let items: any[];
      if (searchuseYN === 'E') {
        items = await this.ItemRepository.query(`
        SELECT * 
        FROM health_food_data
        WHERE ${searchTab} like "%${searchName}%"
        AND REGIST_DT > ${firstDate}
        AND ${secondDate} > REGIST_DT
        ${searchLimit}
        `);
      } else {
        items = await this.ItemRepository.query(`
        SELECT * 
        FROM health_food_data
        WHERE ${searchTab} like "%${searchName}%"
        AND useYN = "${searchuseYN}"
        AND REGIST_DT > ${firstDate}
        AND ${secondDate} > REGIST_DT
        ${searchLimit}
        `);
      }
      console.log(items.length);

      return { data: items };
    } catch (err) {
      console.log(err.message);
    }
  }
}
