import { Module } from '@nestjs/common';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './entities/warehouse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Warehouse.name,
        schema: WarehouseSchema,
      },
    ]),
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService],
  exports: [
    MongooseModule.forFeature([
      { name: Warehouse.name, schema: WarehouseSchema },
    ]),
  ],
})
export class WarehousesModule {}
