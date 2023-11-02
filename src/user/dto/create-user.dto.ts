
import { UserPermission } from '../entities/userPermission.entity';

export class CreateUserDto {
  
  empId: string;

  
  userName: string;

  password: string;

  
  createdBy?: number;

  
  updatedBy?: number;

 
  isActive: boolean;

  
  userPermission: UserPermission;

  
  role: string;
}
