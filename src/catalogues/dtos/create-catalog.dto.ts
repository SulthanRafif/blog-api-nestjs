import { IsNotEmpty } from 'class-validator';

export class CreateCatalogDto {
  @IsNotEmpty()
  name: string;
}
