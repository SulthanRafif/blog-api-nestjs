import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class EditCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
