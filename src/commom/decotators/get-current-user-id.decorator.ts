import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Unable to access token');
    }
    const jwtService = new JwtService({
      secret: process.env.AT_SECRET, // Read the secret key from process.env
    });
    const decodedToken = jwtService.verify(token);
    return decodedToken['id'];
  },
);
