import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiResponse } from 'src/commom/dto/response.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiCreatedResponse({ description: 'User has successfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
  ): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.userService.create(createUserDto, req['user'].id);
      response = new ApiResponse(
        data,
        'User created Successfully',
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

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiCreatedResponse({ description: 'User has successfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findAll(): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.userService.findAll();
      response = new ApiResponse(
        data,
        'User data found Successfully',
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

  @Get(':id')
  @ApiOperation({ summary: 'find user by id' })
  @ApiCreatedResponse({ description: 'User has successfully created' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.userService.findOne(+id);
      response = new ApiResponse(
        data,
        'User found Successfully',
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let response: ApiResponse<any>;
    try {
      const data = await this.userService.remove(+id);
      response = new ApiResponse(
        data,
        'User deleted Successfully',
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
