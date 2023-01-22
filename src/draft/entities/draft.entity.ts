import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
