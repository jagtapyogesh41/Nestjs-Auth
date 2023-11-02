import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  Unique,
} from 'typeorm';
import { UserData } from './user.entity';

@Entity('as_permission')
@Unique(['name'])
export class UserPermission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name?: string | null;

  @Column({ nullable: true })
  pa?: number | null;

  @Column({ nullable: true })
  qu?: number | null;

  @Column({ nullable: true })
  u?: number | null;

  @Column({ nullable: true })
  sb?: number | null;

  @Column({ nullable: true })
  sh?: number | null;

  @Column({ nullable: true })
  su?: number | null;

  @Column({ nullable: true })
  sr?: number | null;

  @Column({ nullable: true })
  cs?: number | null;

  @Column({ nullable: true })
  pr?: number | null;

  @Column({ nullable: true })
  pp?: number | null;

  @Column({ nullable: true })
  jp?: number | null;

  @Column({ nullable: true })
  pt?: number | null;

  @Column({ nullable: true })
  d?: number | null;

  @Column({ nullable: true })
  bf?: number | null;

  @Column({ nullable: true })
  ip?: number | null;

  @Column({ nullable: true })
  ds?: number | null;

  @Column({ nullable: true })
  emp?: number | null;

  @Column({ nullable: true })
  attnds?: number | null;

  @Column({ nullable: true })
  po?: number | null;

  @Column({ nullable: true })
  mg?: number | null;

  @Column({ nullable: true })
  rpt?: number | null;

  @Column({ nullable: true })
  tt?: number | null;

  @Column({ nullable: true })
  b?: number | null;

  @Column({ nullable: true })
  pln?: number | null;

  @OneToOne(() => UserData, (userDate) => userDate.userPermission, {
    nullable: true, // Make the user field optional
  })
  userDate?: UserData;

  constructor(userPermission: Partial<UserPermission>) {
    super();
    Object.assign(this, userPermission);
  }
}
