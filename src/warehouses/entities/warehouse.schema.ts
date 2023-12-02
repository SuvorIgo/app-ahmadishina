import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type WarehouseDocument = HydratedDocument<Warehouse>;

@Schema()
export class Warehouse {
  @ApiProperty({
    type: Number,
    description: 'Id склада',
    required: true,
    example: 15,
  })
  @Prop({ type: Number, min: 1, required: true })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Адрес склада',
    required: true,
    example: 'ул. Троицкая, Подольск, Московская обл.',
  })
  @Prop({ type: String, required: true })
  address: string;

  @ApiProperty({
    type: String,
    description: 'Наименование склада',
    required: true,
    example: 'Москва (Коледино)',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Город склада',
    required: true,
    example: 'Москва',
  })
  @Prop({ type: String, required: true })
  city: string;

  @ApiProperty({
    type: Number,
    description: 'Долгота',
    required: true,
    example: 55.386871,
  })
  @Prop({ type: Number, required: true })
  longitude: number;

  @ApiProperty({
    type: Number,
    description: 'Широта',
    required: true,
    example: 37.588898,
  })
  @Prop({ type: Number, required: true })
  latitude: number;

  @ApiProperty({
    type: Boolean,
    description: 'Признак того, что склад уже выбран продавцом',
    required: false,
    example: true,
  })
  @Prop({ type: Boolean, default: false })
  selected: boolean;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
