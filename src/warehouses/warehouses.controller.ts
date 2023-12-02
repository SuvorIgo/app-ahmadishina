import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { Warehouse } from './entities/warehouse.schema';
import { UpdateWarehouseDto } from './dtos/update-warehouse.dto';
import { PaginationQueries } from 'src/request-queries/pagination.queries';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post('/create')
  async create(
    @Body() payload: CreateWarehouseDto,
  ): Promise<Warehouse | HttpException> {
    return await this.warehousesService.create(payload);
  }

  @Get('/')
  async getAll(@Query() queries: PaginationQueries): Promise<Warehouse[] | HttpException> {
    return await this.warehousesService.getAll(queries);
  }

  @Get('/getById/:id')
  async getById(@Param('id') id: number): Promise<Warehouse | HttpException> {
    return await this.warehousesService.getById(Number(id));
  }

  @Get('/getByName/:name')
  async getByName(
    @Param('name') name: string,
  ): Promise<Warehouse | HttpException> {
    return await this.warehousesService.getByName(name);
  }

  @Get('/getBySelected/:selected')
  async getBySelected(
    @Param('selected') selected: string,
  ): Promise<Warehouse[] | HttpException> {
    return await this.warehousesService.getBySelected(JSON.parse(selected));
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateWarehouseDto,
  ): Promise<Warehouse | HttpException> {
    return await this.warehousesService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<Warehouse | HttpException> {
    return await this.warehousesService.delete(id);
  }
}
