import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BoilerModule } from './boiler/boiler.module';
import { LoggerMiddleware } from './commom/middleware/logger.middleware';
import { AuthMiddleware } from './commom/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserData } from './user/entities/user.entity';
import { UserPermission } from './user/entities/userPermission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([UserData, UserPermission]),
    DatabaseModule,
    JwtModule.register({}),
    UserModule,
    DatabaseModule,
    AuthModule,
    BoilerModule,
  ],
  controllers: [],
  providers: [AuthMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'v1/auth', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
