import { IsOptional } from 'class-validator';

export class FilterCategoryDto {
  @IsOptional()
  search: string;

  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;

  @IsOptional()
  order_by: string;
}
