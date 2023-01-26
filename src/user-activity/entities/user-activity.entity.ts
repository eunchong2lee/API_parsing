import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserActivity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  account: string;

  @Column()
  date: Date;

  @Column()
  page: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
