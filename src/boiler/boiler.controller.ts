import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { BoilerService } from './boiler.service';
import { Boiler } from './entities/boiler.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBoilerDto } from './dto/create-boiler.dto';
import { ApiResponse, RequestDate } from 'src/commom/dto/response.dto';

@Controller('/boiler')
@ApiTags('boiler')
export class BoilerController {
  constructor(private readonly boilerService: BoilerService) {}

  @Post()
  @ApiBearerAuth()
  async create(@Body() boilerData: CreateBoilerDto): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.boilerService.create(boilerData);
      response = new ApiResponse(
        data,
        'Boiler Data saved successfully',
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
  @ApiBearerAuth()
  async findAll(): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.boilerService.findAll();
      response = new ApiResponse(
        data,
        'Boiler data found Successfully',
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

  @Post('/list/ByDate')
  @ApiBearerAuth()
  async findByDate(@Body() dates: RequestDate): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.boilerService.findByDate(dates);
      response = new ApiResponse(
        data,
        'Boiler data found Successfully',
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
  @ApiBearerAuth()
  async findById(@Param('id') id: number): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.boilerService.findById(id);
      response = new ApiResponse(
        data,
        'Bolier data found Successfully',
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

  @Put(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() boilerData: Partial<Boiler>,
  ): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.boilerService.update(id, boilerData);
      response = new ApiResponse(
        data,
        'Bolier data Updated Successfully',
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

  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Param('id') id: number): Promise<ApiResponse<any>> {
    let response: ApiResponse<any>;
    try {
      const data = await this.boilerService.remove(id);
      response = new ApiResponse(
        data,
        'Bolier data deleted Successfully',
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
