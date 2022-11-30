import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vitamin } from './entities/vitamin.entity';

@Injectable()
export class VitaminService {
  constructor(@InjectRepository(Vitamin) private repo: Repository<Vitamin>) {}
}
