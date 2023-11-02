import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from 'src/user/entities/userPermission.entity';
import { UserData } from 'src/user/entities/user.entity';
import { CryptoService } from './crypto-js.service';
import { UserService } from 'src/user/user.service';
import { MappingService } from './permission-map.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserData, UserPermission]),
    JwtModule.register({}),
  ],
  providers: [AuthService, MappingService, CryptoService, UserService],
  controllers: [AuthController],
  exports: [AuthService, CryptoService, MappingService],
})
export class AuthModule {}
