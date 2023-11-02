import { IsNotEmpty, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserPermission } from '../entities/userPermission.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'user email',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  empId: string;

  @ApiProperty({
    description: 'userName',
    required: true,
    type: String,
  })
  userName: string;

  @ApiProperty({
    description: 'password',
    required: true,
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'for now its mandatory',
    required: true,
    type: isNumber,
  })
  @IsNotEmpty()
  createdBy?: number;

  @ApiProperty({
    description: 'for now its mandatory',
    required: true,
    type: isNumber,
  })
  @IsNotEmpty()
  updatedBy?: number;

  @ApiProperty({
    description: 'isActive',
    required: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The user email',
    required: true,
    type: Object,
  })
  userPermission: UserPermission;

  @ApiProperty({
    description: 'role',
    required: true,
    type: String,
  })
  role: string;
}
