import { PartialType } from '@nestjs/swagger';
import { CreateBoilerDto } from './create-boiler.dto';

export class UpdateBoilerDto extends PartialType(CreateBoilerDto) {}
