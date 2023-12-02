import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaginationQueries {
  @ApiProperty({
    type: String,
    description: 'Номер страницы',
    required: false,
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsString()
  page?: string = '1';

  @ApiProperty({
    type: String,
    description: 'Размер элементов на странице',
    required: false,
    example: 1,
    default: 10,
    minimum: 2,
    maximum: 50,
  })
  @IsString()
  pageSize?: string = '10';
}
