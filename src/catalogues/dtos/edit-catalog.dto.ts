import { IsNotEmpty } from 'class-validator';

export class EditCatalogDto {
  @IsNotEmpty()
  name: string;
}
