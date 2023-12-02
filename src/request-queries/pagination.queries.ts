import { IsString } from 'class-validator';

export class PaginationQueries {
  @IsString()
  page?: string = '1';

  @IsString()
  pageSize?: string = '10';
}
