import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUserEntity } from './entities/auth.entity';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private repo: Repository<AdminUserEntity>,
  ) {}

  async existsByEmail(email: string) {
    try {
      const user = await this.repo.findOne({ email });
      console.log(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async existsByUserId(account: string) {
    const user = await this.repo.findOne({ account });
    console.log(user);
    return user;
  }

  async save(options) {
    try {
      return await this.repo.save(options);
    } catch (err) {
      console.log(err);
    }
  }

  async find(options) {
    return await this.repo.find({ where: options });
  }

  async findOne(options) {
    return await this.repo.findOne({ where: options });
  }

  async update(id: number, options) {
    return await this.repo.update(id, options);
  }
}
