import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UseType = 'Y' | 'N';

@Entity()
export class HealthFoodData {
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

  @Column('text', { nullable: true })
  PRMS_IMG: string;

  @Column('simple-json', { nullable: true })
  PRMS_STANDARD: string;

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
