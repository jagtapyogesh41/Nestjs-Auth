import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): Promise<JwtPayload> => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Unable to access token');
    }
    const jwtService = new JwtService({
      secret: process.env.AT_SECRET, // Read the secret key from process.env
    });
    const user = jwtService.verify(token);
    return user;
  },
);
