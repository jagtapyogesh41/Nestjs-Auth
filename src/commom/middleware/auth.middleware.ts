import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Request,
  Response,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/auth/crypto-js.service';
import { UserService } from 'src/user/user.service';
import { MappingService } from 'src/auth/permission-map.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly exceptionPaths: string[] = ['/public', '/v1/auth']; // Add your exception paths here

  constructor(
    private readonly config: ConfigService,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
    private readonly mappingService: MappingService,
    private readonly authService: AuthService,
  ) {}

  async use(@Request() req, @Response() res, next: NextFunction) {
    const key = this.config.getOrThrow('AT_SECRET');
    const url = req.originalUrl;

    try {
      if (this.exceptionPaths.some((path) => url.startsWith(path))) {
        return next(); // Skip authentication for exception paths
      }

      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw new ForbiddenException('Authorization header missing');
      }
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        throw new ForbiddenException('Unauthorized');
      }
      const decodedToken = this.jwtService.verify(token, {
        secret: key,
      });

      const user = await this.userService.findOne(decodedToken.id);
      if (!user) {
        throw new ForbiddenException('user not found');
      }
      req.user = decodedToken;
      req['requestTime'] = Date.now();

      const checkKey = await this.cryptoService.encrypt(
        `${decodedToken.id}${decodedToken.ts}`,
      );
      if (checkKey !== decodedToken.secret) {
        throw new ForbiddenException('key not matched');
      }

      const section = url.split('/')[1];
      const ans = await this.authService.checkPermissions(req, section);

      if (!ans) {
        console.log(`${req.method} fail`);
        throw new ForbiddenException('Permission denied');
      }

      console.log('Auth done');
      next(); // Token is valid, proceed to the route handler
    } catch (error) {
      console.log('error');
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
        success: false,
        statusCode: 400,
        timestamp: Date.now(),
      });
    }
  }
}
