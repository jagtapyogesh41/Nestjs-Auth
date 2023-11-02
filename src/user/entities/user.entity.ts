import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { UserPermission } from './userPermission.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('as_user_data')
@Unique(['userName', 'empId'])
export class UserData {
  @ApiProperty({
    description: 'unique id for user',
    required: true,
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description: 'empId of employee',
    required: true,
    type: String,
  })
  empId?: string;

  @Column()
  @ApiProperty({
    description: 'userName',
    required: true,
    type: String,
  })
  userName: string;

  @Column()
  @ApiProperty({
    description: 'password',
    required: true,
    type: String,
  })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'cretedDate',
    required: true,
    type: String,
  })
  createdDate?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'updatedDate',
    required: true,
    type: String,
  })
  updatedDate?: Date;

  @Column()
  @ApiProperty({
    description: 'the user created this id',
    required: true,
    type: String,
  })
  createdBy?: number;

  @Column()
  @ApiProperty({
    description: 'user updated this id',
    required: true,
    type: String,
  })
  updatedBy?: number;

  @Column()
  @ApiProperty({
    description: 'role',
    required: true,
    type: String,
  })
  role?: string;

  @Column({ default: true })
  @ApiProperty({
    description: 'isActive',
    required: true,
    type: String,
  })
  isActive: boolean;

  @Column({ nullable: true })
  hashedRt?: string;

  @ApiProperty({
    description: 'userPermission',
    required: true,
    type: String,
  })
  @OneToOne(() => UserPermission, (userPermission) => userPermission.userDate, {
    cascade: true,
    nullable: true, // Make the userPermission field optional
  })
  @JoinColumn()
  userPermission?: UserPermission;

  constructor(user: Partial<UserData>) {
    Object.assign(this, user);
  }
}
