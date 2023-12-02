import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { Warehouse } from './entities/warehouse.schema';

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) {}

    @Post('/create')
    async create(@Body() payload: CreateWarehouseDto): Promise<Warehouse | HttpException> {
        return await this.warehousesService.create(payload);
    }

    @Get('/getAll')
    async getAll(): Promise<Warehouse[] | HttpException> {
        return await this.warehousesService.getAll();
    }

    @Get('/get/:id')
    async getById(@Param('id') id: number): Promise<Warehouse | HttpException> {
        return await this.warehousesService.getById(Number(id))
    }

    @Get('/getByName/:name')
    async getByName(@Param('name') name: string): Promise<Warehouse | HttpException> {
        return await this.warehousesService.getByName(name);
    }

    @Get('/getBySelected/:selected')
    async getBySelected(@Param('selected') selected: string): Promise<Warehouse[] | HttpException> {
        return await this.warehousesService.getBySelected(JSON.parse(selected));
    }
}
