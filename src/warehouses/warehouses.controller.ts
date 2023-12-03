import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { Warehouse } from './entities/warehouse.schema';
import { UpdateWarehouseDto } from './dtos/update-warehouse.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueries } from '../request-queries/pagination.queries';
import { HttpExceptionType } from '../types/http-exception.type';

@ApiTags('Склады WB')
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @ApiOperation({ summary: 'Создание и запись в БД нового склада' })
  @ApiBody({ type: CreateWarehouseDto })
  @ApiCreatedResponse({ type: Warehouse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpExceptionType })
  @Post()
  async create(
    @Body() payload: CreateWarehouseDto,
  ): Promise<Warehouse | HttpException> {
    return await this.warehousesService.create(payload);
  }

  @ApiOperation({ summary: 'Получение всех складов' })
  @ApiResponse({ status: HttpStatus.OK, type: [Warehouse] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpExceptionType })
  @Get('/')
  async getAll(
    @Query() queries: PaginationQueries,
  ): Promise<Warehouse[] | HttpException> {
    return await this.warehousesService.getAll(queries);
  }

  @ApiOperation({ summary: 'Получение склада по его id' })
  @ApiResponse({ status: HttpStatus.OK, type: Warehouse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpExceptionType })
  @Get('/getById/:id')
  async getById(@Param('id') id: number): Promise<Warehouse | HttpException> {
    return await this.warehousesService.getById(Number(id));
  }

  @ApiOperation({
    summary:
      'Получение складов по признаку того, что склад уже был выбран продавцом',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [Warehouse] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpExceptionType })
  @Get('/getBySelected/:selected')
  async getBySelected(
    @Param('selected') selected: string,
  ): Promise<Warehouse[] | HttpException> {
    return await this.warehousesService.getBySelected(JSON.parse(selected));
  }

  @ApiOperation({ summary: 'Обновление склада по его id' })
  @ApiBody({ type: UpdateWarehouseDto })
  @ApiResponse({ status: HttpStatus.OK, type: [Warehouse] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpExceptionType })
  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateWarehouseDto,
  ): Promise<Warehouse | HttpException> {
    return await this.warehousesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Удаление склада по его id' })
  @ApiResponse({ status: HttpStatus.OK, type: [Warehouse] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HttpExceptionType })
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Warehouse | HttpException> {
    return await this.warehousesService.delete(id);
  }
}
