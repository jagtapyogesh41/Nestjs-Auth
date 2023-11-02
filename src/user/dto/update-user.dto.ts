import { PartialType } from '@nestjs/mapped-types';
import { UserData } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(UserData) {}
