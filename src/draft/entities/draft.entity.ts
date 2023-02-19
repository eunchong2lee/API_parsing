import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UseType = 'Y' | 'N';

@Entity()
export class Draft {
  // id
  @PrimaryGeneratedColumn({ type: 'int', name: '_id' })
  _id: number;

  @Column()
  PRDUCT_ID: number;

  @Column('text', { nullable: true })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class DraftImage {
  // id
  @PrimaryGeneratedColumn({ type: 'int', name: '_id' })
  _id: number;

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
