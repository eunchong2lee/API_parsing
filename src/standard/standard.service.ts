import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Repository } from 'typeorm';
import { Standard } from './entities/standard.entity';

@Injectable()
export class StandardService {
  constructor(
    @InjectRepository(Standard)
    private readonly StandardRepository: Repository<Standard>,
    @InjectRepository(HealthFoodData)
    private readonly HealthFoodDataRepository: Repository<HealthFoodData>,
  ) {}

  // setting
  async setStandard() {
    try {
      const data = await this.HealthFoodDataRepository.query(`
      SELECT PRMS_STANDARD
      FROM health_food_data`);
      for (let i = 0; i < data.length; i++) {
        if (data[i].PRMS_STANDARD) {
          const parse_data = Object.keys(JSON.parse(data[i].PRMS_STANDARD));
          for (let i = 0; i < parse_data.length; i++) {
            if (parse_data[i]) {
              const find_data = await this.StandardRepository.query(`
                      SELECT *
                      FROM standard
                      WHERE name = "${parse_data[i]}"`);
              if (!find_data.length) {
                const new_standard = new Standard();
                new_standard.name = parse_data[i];
                await this.StandardRepository.save(new_standard);
              }
            }
          }
        }
      }

      const final_standard = await this.StandardRepository.query(`
      SELECT *
      FROM standard`);
      return final_standard;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }

  // 검색해서 받아오기
  async getStandard(name: string) {
    try {
      const data = await this.StandardRepository.query(
        `SELECT name FROM standard WHERE name like "%${name}%"`,
      );
      return { data };
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }
}
