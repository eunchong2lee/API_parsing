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

  async postFile(file: Express.Multer.File) {
    try {
      console.log(file);
      if (file) {
        console.log(file);
        const split_data = file.originalname.split('.');
        console.log(split_data);
        const extension = split_data[0];
        const file_name = uuidv4() + '.' + extension;
      }
      return '데이터 넘어옴';
    } catch (err) {
      console.log(err.message);
    }
  }
}
