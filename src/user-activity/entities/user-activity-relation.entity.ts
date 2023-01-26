import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserActivityRelation {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  date: Date;

  @Column()
  page: string;

  @Column()
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class UserActivityTotalRelation {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  date: Date;

  @Column()
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
