import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vitamin {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  prdlst_report_ledg_no: string;

  @Column()
  prdlst_nm: string;

  @Column()
  prms_dt: string;

  @Column()
  prdlst_report_no: string;

  @Column()
  bssh_nm: string;

  @Column()
  total_count: string;

  @Column()
  no: string;

  @Column('simple-json', { nullable: true })
  ingredient: string;

  @Column({ nullable: true })
  prms_img: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
