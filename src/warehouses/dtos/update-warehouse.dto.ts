import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateWarehouseDto {
  @ApiProperty({
    type: String,
    description: 'Адрес склада',
    required: false,
    example: 'ул. Троицкая, Подольск, Московская обл.',
  })
  @IsString({ message: 'адрес должен быть строкой' })
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: String,
    description: 'Наименование склада',
    required: false,
    example: 'Москва (Коледино)',
  })
  @IsString({ message: 'имя должно быть строкой' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Город склада',
    required: false,
    example: 'Москва',
  })
  @IsString({ message: 'город должен быть строкой' })
  @IsOptional()
  city?: string;

  @ApiProperty({
    type: Number,
    description: 'Долгота',
    required: false,
    example: 55.386871,
  })
  @IsLongitude({ message: 'долгота должна быть float' })
  @IsOptional()
  longitude?: number;

  @ApiProperty({
    type: Number,
    description: 'Широта',
    required: false,
    example: 37.588898,
  })
  @IsLatitude({ message: 'широта должна быть float' })
  @IsOptional()
  latitude?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Признак того, что склад уже выбран продавцом',
    required: false,
    example: true,
  })
  @IsBoolean({ message: 'selected должен быть true или false' })
  @IsOptional()
  selected?: boolean = false;
}
