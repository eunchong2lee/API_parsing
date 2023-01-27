import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserActivityRelation,
  UserActivityTotalRelation,
} from './entities/user-activity-relation.entity';
import { UserActivity } from './entities/user-activity.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepository: Repository<UserActivity>,
    @InjectRepository(UserActivityRelation)
    private readonly userActivityRelationRepository: Repository<UserActivityRelation>,
    @InjectRepository(UserActivityTotalRelation)
    private readonly userActivityTotalRelationRepository: Repository<UserActivityTotalRelation>,
  ) {}

  async postUserActivity(account, page) {
    try {
      // 1. 해당 당일 날짜의 user-activity-relation이 있는지
      // 2. 해덩 당일 날짜의 user-activity가 있는지 user-activity만들기 -> 있으면 그대로 없으면 user-activity-relation +1 및 user-activity 활용

      const kr_curr = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
      const parse_date = `${kr_curr.getUTCFullYear()}-${
        kr_curr.getUTCMonth() + 1
      }-${kr_curr.getUTCDate()}`;

      const [[find_page_relation], [find_total_relation]] = await Promise.all([
        this.userActivityRelationRepository.query(`
            SELECT *
            FROM user_activity_relation
            WHERE date = DATE_FORMAT(now(), '%Y-%m-%d')
        `),

        this.userActivityTotalRelationRepository.query(`
            SELECT *
            FROM user_activity_total_relation
            WHERE date = DATE_FORMAT(now(), '%Y-%m-%d')
        `),
      ]);

      const userActivity = new UserActivity();
      userActivity.account = account;
      userActivity.date = kr_curr;
      userActivity.page = page;

      await Promise.all([
        this.userActivityRepository.save(userActivity),
        this.find_page_relation(find_page_relation, page, parse_date),
        this.find_total_relation(find_total_relation, parse_date),
      ]);

      return '등록';
    } catch (err) {
      console.log(err.messsage);
    }
    if (!account) {
      return '로그인 하세요';
    }
  }

  async getUserTotalActivity() {
    const data = await this.userActivityTotalRelationRepository.query(``);
    return 'hello';
  }

  async getUserRelationActivity() {
    const data = await this.userActivityRelationRepository.query(``);
    return 'hello';
  }

  // 함수
  async find_page_relation(find_page_relation, page, now_date) {
    if (!find_page_relation) {
      const new_page_relation = new UserActivityRelation();

      new_page_relation.page = page;
      new_page_relation.count = 1;
      new_page_relation.date = now_date;

      await this.userActivityRelationRepository.save(new_page_relation);
    } else {
      find_page_relation.count++;
      await this.userActivityRelationRepository.update(
        find_page_relation,
        find_page_relation._id,
      );
    }
  }

  async find_total_relation(find_total_relation, now_date) {
    if (!find_total_relation) {
      const new_total_relation = new UserActivityTotalRelation();
      new_total_relation.count = 1;
      new_total_relation.date = now_date;
      await this.userActivityTotalRelationRepository.save(new_total_relation);
    } else {
      find_total_relation.count++;
      await this.userActivityTotalRelationRepository.update(
        find_total_relation,
        find_total_relation._id,
      );
    }
  }
}
