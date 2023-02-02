import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserEntity } from 'src/auth/entities/auth.entity';
import { HealthFoodData } from 'src/HealthFoodData/entities/HealthFoodData.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(HealthFoodData)
    private readonly AnalyticsRepository: Repository<HealthFoodData>,
    @InjectRepository(AdminUserEntity)
    private readonly AdminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async getHealthFoodAnalytics() {
    const [day, month, year, total, users] = await Promise.all([
      // 일자별
      this.get_day(),
      // 달별
      this.get_month(),
      // 연도별
      this.get_year(),

      this.AnalyticsRepository.query(`SELECT * FROM health_food_data`),

      this.AdminUserRepository.query(`SELECT * FROM AdminUser`),
    ]);

    const data = {
      day,
      month,
      year,
      total: total.length,
      user: users.length,
    };

    return { data };
  }

  async get_day() {
    //12
    const day = await this.AnalyticsRepository.query(`
    SELECT DATE_FORMAT(createdAt, '%Y%m%d') AS date, count(*) AS cnt
    FROM crawl.health_food_data
    GROUP BY DATE_FORMAT(createdAt, '%Y%m%d')
    ORDER BY date DESC
    limit 12`);

    const final_data = [];
    const kr_curr = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

    for (let i = 0; i <= 11; i++) {
      const clone = new Date(kr_curr);
      clone.setDate(kr_curr.getDate() - i);

      const kr_year = clone.getUTCFullYear();
      const kr_month = clone.getUTCMonth() + 1;
      let new_month;
      if (kr_month < 10) {
        new_month = `0${kr_month}`;
      } else {
        new_month = kr_month;
      }
      const kr_day = clone.getUTCDate();
      const kr_date = parseInt(`${kr_year}${new_month}${kr_day}`);
      const parsing = { date: kr_date, cnt: 0 };
      for (let j = 0; j < day.length; j++) {
        if (kr_date == day[j].date) {
          parsing.cnt = day[j].cnt;
        }
      }
      final_data.push(parsing);
    }

    return final_data;
  }

  async get_month() {
    const month = await this.AnalyticsRepository.query(`
    SELECT DATE_FORMAT(createdAt, '%Y%m') AS date, count(*) AS cnt
    FROM crawl.health_food_data
    GROUP BY DATE_FORMAT(createdAt, '%Y%m')
    ORDER BY date DESC
    limit 12`);

    const final_data = [];
    const kr_curr = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

    for (let i = 0; i <= 11; i++) {
      const clone = new Date(kr_curr);
      clone.setMonth(kr_curr.getMonth() - i);
      const kr_year = clone.getUTCFullYear();
      const kr_month = clone.getUTCMonth() + 1;
      let new_month;
      if (kr_month < 10) {
        new_month = `0${kr_month}`;
      } else {
        new_month = kr_month;
      }
      const kr_date = parseInt(`${kr_year}${new_month}`);
      const parsing = { date: kr_date, cnt: 0 };
      for (let j = 0; j < month.length; j++) {
        if (kr_date == month[j].date) {
          parsing.cnt = month[j].cnt;
        }
      }
      final_data.push(parsing);
    }

    return final_data;
  }

  async get_year() {
    const year = await this.AnalyticsRepository.query(`
        SELECT DATE_FORMAT(createdAt, '%Y') AS date, count(*) AS cnt
        FROM crawl.health_food_data
        GROUP BY DATE_FORMAT(createdAt, '%Y')
        ORDER BY date DESC
        limit 12`);
    const final_data = [];
    const kr_curr = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

    for (let i = 0; i <= 11; i++) {
      const clone = new Date(kr_curr);
      clone.setFullYear(kr_curr.getFullYear() - i);
      const kr_year = clone.getUTCFullYear();
      const kr_date = parseInt(`${kr_year}`);
      const parsing = { date: kr_date, cnt: 0 };
      for (let j = 0; j < year.length; j++) {
        if (kr_date == year[j].date) {
          parsing.cnt = year[j].cnt;
        }
      }
      final_data.push(parsing);
    }

    return final_data;
  }

  // async makeDate() {}
}
