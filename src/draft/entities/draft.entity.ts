import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Draft {
  // id
  @PrimaryGeneratedColumn({ type: 'int', name: '_id' })
  _id: number;

  @Column('text', { nullable: true })
  text: string;
}
