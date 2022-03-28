import { IsOptional } from 'class-validator';

export class FilterCatalogDto {
  @IsOptional()
  search: string;
}
