import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Draft } from './entities/draft.entity';
import { v4 as uuidv4 } from 'uuid';

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

  async postDraft(data, id) {
    try {
      const newDraft = new Draft();
      newDraft.text = data;
      newDraft.PRDUCT_ID = id;

      await this.DraftRepository.save(newDraft);

      return { data: { message: 'success', data: newDraft } };
    } catch (err) {
      console.log(err.message);
    }
  }
}
