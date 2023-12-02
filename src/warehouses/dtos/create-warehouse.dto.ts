import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({
    type: Number,
    description: 'Id склада',
    required: true,
    example: 15,
  })
  @IsInt({ message: 'id должен быть числом' })
  @IsNotEmpty({ message: 'по id нет данных' })
  @Min(0, { message: 'id должен быть больше одного' })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Адрес склада',
    required: true,
    example: 'ул. Троицкая, Подольск, Московская обл.',
  })
  @IsString({ message: 'адрес должен быть строкой' })
  @IsNotEmpty({ message: 'по адресу нет данных' })
  address: string;

  @ApiProperty({
    type: String,
    description: 'Наименование склада',
    required: true,
    example: 'Москва (Коледино)',
  })
  @IsString({ message: 'имя должно быть строкой' })
  @IsNotEmpty({ message: 'по имени нет данных' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Город склада',
    required: true,
    example: 'Москва',
  })
  @IsString({ message: 'город должен быть строкой' })
  @IsNotEmpty({ message: 'по городу нет данных' })
  city: string;

  @ApiProperty({
    type: Number,
    description: 'Долгота',
    required: true,
    example: 55.386871,
  })
  @IsLongitude({ message: 'долгота должна быть float' })
  longitude: number;

  @ApiProperty({
    type: Number,
    description: 'Широта',
    required: true,
    example: 37.588898,
  })
  @IsLatitude({ message: 'широта должна быть float' })
  latitude: number;

  @ApiProperty({
    type: Boolean,
    description: 'Признак того, что склад уже выбран продавцом',
    required: false,
    example: true,
    default: false
  })
  @IsBoolean({ message: 'selected должен быть true или false' })
  selected?: boolean = false;
}
