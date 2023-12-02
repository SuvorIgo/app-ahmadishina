import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './entities/warehouse.schema';
import { Model } from 'mongoose';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { UpdateWarehouseDto } from './dtos/update-warehouse.dto';
import { PaginationQueries } from 'src/request-queries/pagination.queries';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel(Warehouse.name)
    private readonly warehouseModel: Model<WarehouseDocument>,
  ) {}

  async create(
    payload: CreateWarehouseDto,
  ): Promise<Warehouse | HttpException> {
    try {
      const warehouse = new this.warehouseModel(payload);

      return await warehouse.save();
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll({
    pageSize,
    page,
  }: PaginationQueries): Promise<Warehouse[] | HttpException> {
    try {
      if (typeof Number(page) !== 'number' || Number(page) < 1)
        return new HttpException(
          'page должно быть целочисленным значением и быть не меньше 1',
          HttpStatus.BAD_REQUEST,
        );
      if (
        typeof Number(pageSize) !== 'number' ||
        Number(pageSize) < 2 ||
        Number(pageSize) > 50
      )
        return new HttpException(
          'pageSize должно быть целочисленным значением и быть больше или равно 2, но быть меньше или равно 50',
          HttpStatus.BAD_REQUEST,
        );

      return await this.warehouseModel
        .find()
        .limit(Number(pageSize))
        .skip(Number(page) == 1 ? 0 : (Number(page) - 1) * Number(pageSize));
    } catch (err) {
      console.log(err);
      return new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: number): Promise<Warehouse | HttpException> {
    try {
      if (!id)
        return new HttpException(
          'id должен быть целочисленным значением',
          HttpStatus.BAD_REQUEST,
        );

      return await this.warehouseModel.findOne({ id: id });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getByName(name: string): Promise<Warehouse | HttpException> {
    try {
      if (!name)
        return new HttpException(
          'name должен быть строкой',
          HttpStatus.BAD_REQUEST,
        );

      return await this.warehouseModel.findOne({ name: name });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBySelected(selected: boolean): Promise<Warehouse[] | HttpException> {
    try {
      if (!(typeof selected == 'boolean'))
        return new HttpException(
          'selected должен быть булевым значением',
          HttpStatus.BAD_REQUEST,
        );

      return (await this.warehouseModel.find()).filter(
        (item) => item.selected == selected,
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    payload: UpdateWarehouseDto,
  ): Promise<Warehouse | HttpException> {
    try {
      return await this.warehouseModel.findOneAndUpdate({ id: id }, payload);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<Warehouse | HttpException> {
    try {
      const warehouse = await this.getById(id);

      await this.warehouseModel.deleteOne({ id: id });

      return warehouse;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
