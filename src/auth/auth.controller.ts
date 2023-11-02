import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Request,
  Req,
} from '@nestjs/common';
import { SignInUser } from './dto/create-login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from 'src/commom/dto/response.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  async create(@Body() createAuthDto: CreateUserDto, @Req() req: Request) {
    try {
      return await this.authService.signup(createAuthDto, req['user'].id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('local/signin')
  async signinLocal(@Body() dto: SignInUser): Promise<any> {
    console.log('yes');
    let response: ApiResponse<any>;
    try {
      const data = await this.authService.signinLocal(dto);
      response = new ApiResponse(
        data,
        'login Successfully',
        true,
        HttpStatus.OK,
        Date.now(),
      );
    } catch (e) {
      console.error(e.stack);
      response = new ApiResponse(
        null,
        e.message,
        false,
        HttpStatus.BAD_REQUEST,
        Date.now(),
      );
    }
    return response;
  }
}
