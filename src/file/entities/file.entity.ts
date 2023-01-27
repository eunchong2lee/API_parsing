import { PaperSize } from 'exceljs';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UseType = 'Y' | 'N';

@Entity()
export class File {
  // id
  @PrimaryGeneratedColumn({ type: 'int', name: '_id' })
  _id: number;

  // PRDUCT ID
  @Column()
  PRDUCT_ID: number;

  // FILE 총 내용
  @Column('text', { nullable: true })
  File: string;

  //
  @Column('text', { nullable: true })
  commonPath: string;

  @Column('text', { nullable: true })
  detailPath: string;

  @Column('text', { nullable: true })
  originalFileName: string;

  @Column('text', { nullable: true })
  changeFileName: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'Y',
  })
  useYN: UseType;
}
