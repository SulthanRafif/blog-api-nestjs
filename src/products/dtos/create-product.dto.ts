import { IsInt, IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  catalogId: string;

  @IsNotEmpty()
  categoryId: [];
}
