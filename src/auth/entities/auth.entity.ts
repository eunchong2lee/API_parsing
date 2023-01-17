import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ApproveStatus {
  Ready = 'R',
  Processing = 'P',
  Approved = 'A',
  Deny = 'D',
}

@Entity({ name: 'AdminUser' })
export class AdminUserEntity {
  // id
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  _id: number;

  @Column()
  account: string;

  // 비밀번호
  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  //   // 고객 타입
  //   @Column('enum', { name: 'type', enum: ['CORP', 'CLIENT', 'MEMBER'] })
  //   memberType: string | null;

  //email
  @Column('varchar', {
    name: 'email',
    unique: true,
    nullable: true,
    length: 255,
  })
  email: string | null;

  // 전화번호 첫번째 자리
  @Column()
  cp1: number;

  // 전화번호 두번째 자리
  @Column()
  cp2: number;

  // 전화번호 세번째 자리
  @Column()
  cp3: number;

  // 사용자 이름
  @Column('varchar', { name: 'managerName', nullable: true, length: 255 })
  managerName: string | null;

  // 부서
  @Column('varchar', { name: 'dept', nullable: true, length: 255 })
  dept: string | null;

  // 포지션
  @Column('varchar', { name: 'position', nullable: true, length: 255 })
  position: string | null;

  //   @Column()
  //   corporationId: number;

  //   @Column()
  //   businessRegistrationNo: number;

  //   @Column('varchar', {
  //     name: 'accountCopy',
  //     nullable: true,
  //     length: 255,
  //   })
  //   accountCopy: string | null;

  //   @Column('varchar', {
  //     name: 'businessRegistration',
  //     nullable: true,
  //     length: 255,
  //   })
  //   businessRegistration: string | null;

  //   @Column('varchar', { name: 'memo', nullable: true, length: 255 })
  //   memo: string | null;

  //   @Column('enum', { name: 'approvedStatus', enum: ApproveStatus })
  //   approvedStatus: string | null;

  //   @Column('enum', { name: 'approvedStep', enum: ['ZERO', 'FIRST', 'SECOND'] })
  //   approvedStep: boolean | null;

  //   @Column('tinyint', { name: 'blocked', nullable: true, width: 1, default: 0 })
  //   blocked: boolean | null;

  //   @Column('datetime', { name: 'blockedAt', nullable: true })
  //   blockedAt: Date | null;

  @Column('datetime', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('tinyint', {
    name: 'deleted',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  deleted: boolean | null;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;
}
