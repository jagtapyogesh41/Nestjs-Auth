import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('as_boiler')
export class Boiler {
  @ApiProperty({
    description: 'boiler id',
    required: true,
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @ApiProperty({
    description: 'Closing',
    required: true,
    type: Number,
  })
  closing: number;

  @Column({ default: null })
  @ApiProperty({
    description: 'diff',
    required: true,
    type: Number,
  })
  diff: number;

  @Column({ default: null })
  @ApiProperty({
    description: 'temperature',
    required: true,
    type: Number,
  })
  temperature: number;

  @Column({ default: null })
  @ApiProperty({
    description: 'pressure',
    required: true,
    type: Number,
  })
  pressure: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'department name',
    required: true,
    type: String,
  })
  createdDate: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'department name',
    required: true,
    type: String,
  })
  updatedDate: Date;

  constructor(boiler: Partial<Boiler>) {
    Object.assign(this, boiler);
  }
}
