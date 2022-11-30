import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vtest {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  STTEMNT_NO: string;

  @Column({ nullable: true })
  ENTRPS: string;

  @Column()
  PRDUCT: string;

  @Column()
  REGIST_DT: string;

  @Column({ nullable: true })
  DISTB_PD: string;

  @Column('text', { nullable: true })
  SUNGSANG: string;

  @Column({ nullable: true })
  SRV_USE: string;

  @Column('text', { nullable: true })
  PRSRV_PD: string;

  @Column('text', { nullable: true })
  INTAKE_HINT1: string;

  @Column('text', { nullable: true })
  MAIN_FNCTN: string;

  @Column('text', { nullable: true })
  BASE_STANDARD: string;

  @Column({ nullable: true })
  PRMS_IMG: string;

  @Column({ nullable: true })
  PRMS_STANDARD: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
