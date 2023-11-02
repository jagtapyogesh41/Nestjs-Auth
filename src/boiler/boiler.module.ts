import { Module } from '@nestjs/common';
import { BoilerService } from './boiler.service';
import { BoilerController } from './boiler.controller';
import { Boiler } from './entities/boiler.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boiler]),
    DatabaseModule,
    JwtModule.register({}),
  ],
  controllers: [BoilerController],
  providers: [BoilerService],
  exports: [BoilerService],
})
export class BoilerModule {}
