import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/userPermission.entity';
import { UserData } from './entities/user.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserData, UserPermission]),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
