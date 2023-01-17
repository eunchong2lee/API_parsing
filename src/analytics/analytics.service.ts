import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthFoodData } from 'src/vtest/entities/vtest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(HealthFoodData)
    private readonly AnalyticsRepository: Repository<HealthFoodData>,
  ) {}

  async getHealthFoodAnalytics() {
    const [day, month, year] = await Promise.all([
      // 일자별
      this.AnalyticsRepository.query(`
        SELECT DATE_FORMAT(createdAt, '%Y%m%d') AS date, count(*) AS cnt
        FROM crawl.health_food_data
        GROUP BY DATE_FORMAT(createdAt, '%Y%m%d')
        ORDER BY date DESC`),

      // 달별
      this.AnalyticsRepository.query(`
        SELECT DATE_FORMAT(createdAt, '%Y%m') AS date, count(*) AS cnt
        FROM crawl.health_food_data
        GROUP BY DATE_FORMAT(createdAt, '%Y%m')
        ORDER BY date DESC`),

      // 연도별
      this.AnalyticsRepository.query(`
        SELECT DATE_FORMAT(createdAt, '%Y') AS date, count(*) AS cnt
        FROM crawl.health_food_data
        GROUP BY DATE_FORMAT(createdAt, '%Y')
        ORDER BY date DESC`),
    ]);

    const data = {
      day,
      month,
      year,
    };

    return { data };
  }

  // async makeDate() {}
}
