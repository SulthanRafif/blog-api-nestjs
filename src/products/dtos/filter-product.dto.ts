import { IsOptional } from "class-validator";

export class FilterProductDto {
  @IsOptional()
  search: string;

  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;

  @IsOptional()
  order_by: string;
}
