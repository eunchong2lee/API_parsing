import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Draft } from './entities/draft.entity';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private readonly DraftRepository: Repository<Draft>,
  ) {}

  async getDraft(id) {
    try {
      console.log(id);
      const draft = await this.DraftRepository.query(`
        SELECT * FROM DRAFT WHERE _id = "${id}"`);

      console.log(draft);

      return { data: { data: draft, message: 'get draft' } };
    } catch (err) {
      console.log(err.message);
    }
  }

  async postDraft(data) {
    try {
      const new_draft = new Draft();
      new_draft.text = data;

      await this.DraftRepository.save(new_draft);

      return { data: { message: 'success', data: new_draft } };
    } catch (err) {
      console.log(err.message);
    }
  }
}
