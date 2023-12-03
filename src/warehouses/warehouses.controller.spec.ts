import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as supertest from 'supertest';
import { WarehousesModule } from './warehouses.module';
import { Connection } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Warehouse } from './entities/warehouse.schema';
import { ConfigModule } from '@nestjs/config';
import { WarehousesService } from './warehouses.service';
import { HttpException } from '@nestjs/common';

describe('WarehousesController', () => {
  let app: NestExpressApplication;
  let warehousesService: WarehousesService;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
          isGlobal: true,
        }),
        MongooseModule.forRoot(
          `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
          { dbName: 'test' },
        ),
        WarehousesModule,
      ],
      providers: [WarehousesService],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();

    warehousesService = moduleRef.get<WarehousesService>(WarehousesService);

    await app.listen(parseInt(process.env.APP_PORT));

    await apiClient()
      .post('/warehouses')
      .send({
        id: 1,
        address: 'ул. Троицкая, Подольск, Московская обл.',
        name: 'Москва (Коледино)',
        city: 'Москва',
        longitude: 55.386871,
        latitude: 37.588898,
      })
      .expect(201);

    await apiClient()
      .post('/warehouses')
      .send({
        id: 2,
        address: 'ул. Троицкая, Подольск, Московская обл.',
        name: 'Москва (Пушкино1)',
        city: 'Москва',
        longitude: 55.386871,
        latitude: 37.588898,
      })
      .expect(201);

    await apiClient()
      .post('/warehouses')
      .send({
        id: 3,
        address: 'ул. Троицкая, Подольск, Московская обл.',
        name: 'Москва (Пушкино2)',
        city: 'Москва',
        longitude: 55.386871,
        latitude: 37.588898,
        selected: true,
      })
      .expect(201);
  }, 30000);

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });

  it('Create a warehouse', async () => {
    await apiClient()
      .post('/warehouses')
      .send({
        id: 15,
        address: 'ул. Троицкая, Подольск, Московская обл.',
        name: 'Москва (Коледино)',
        city: 'Москва',
        longitude: 55.386871,
        latitude: 37.588898,
      })
      .expect(201);

    const warehouses: Warehouse[] | HttpException =
      await warehousesService.getAll({});

    expect(JSON.parse(JSON.stringify(warehouses)).at(-1).id).toBe(15);
    expect(JSON.parse(JSON.stringify(warehouses)).at(-1).selected).toBe(false);
  });

  it('Get all warehouses', async () => {
    await apiClient().get('/warehouses').expect(200);

    const warehouses: Warehouse[] | HttpException =
      await warehousesService.getAll({});

    expect(JSON.parse(JSON.stringify(warehouses)).length).toBe(3);
  });

  it('Get all warehouses with filter in { pageSize = 2, page = 1 }', async () => {
    await apiClient().get('/warehouses').expect(200);

    const warehouses: Warehouse[] | HttpException =
      await warehousesService.getAll({ page: '1', pageSize: '2' });

    expect(JSON.parse(JSON.stringify(warehouses)).length).toBe(2);
  });

  it('Get warehouse by id', async () => {
    await apiClient().get('/warehouses/getById/1').expect(200);

    const warehouse: Warehouse | HttpException =
      await warehousesService.getById(1);

    expect(JSON.parse(JSON.stringify(warehouse)).id).toBe(1);
  });

  it('Get warehouse by selected', async () => {
    await apiClient().get(`/warehouses/getBySelected/true`).expect(200);

    const warehousesTrue: Warehouse[] | HttpException =
      await warehousesService.getBySelected(true);
    const warehousesFalse: Warehouse[] | HttpException =
      await warehousesService.getBySelected(false);

    expect(JSON.parse(JSON.stringify(warehousesTrue)).length).toBe(1);
    expect(JSON.parse(JSON.stringify(warehousesFalse)).length).toBe(2);
  });

  it('Update warehouse by id = 1', async () => {
    await apiClient().patch('/warehouses/1').send({
      selected: true,
    });

    const warehouse: Warehouse | HttpException =
      await warehousesService.getById(1);

    expect(JSON.parse(JSON.stringify(warehouse)).selected).toBe(true);
  });

  it('Delete warehouse by id = 1', async () => {
    await apiClient().delete('/warehouses/1');

    const warehouses: Warehouse[] | HttpException =
      await warehousesService.getAll({});

    expect(JSON.parse(JSON.stringify(warehouses)).length).toBe(2);
  });
});
