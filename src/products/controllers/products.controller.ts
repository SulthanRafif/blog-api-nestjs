import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { UUIDValidationPipe } from "src/common/pipes/uuid-validation.pipe";
import { CreateProductDto } from "../dtos/create-product.dto";
import { EditProductDto } from "../dtos/edit-product.dto";
import { FilterProductDto } from "../dtos/filter-product.dto";
import { ProductEntity } from "../entities/product.entity";
import { ProductsService } from "../products/products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  public async getProducts(
    @Query() filterProductDto: FilterProductDto
  ): Promise<ProductEntity[]> {
    return this.productsService.getProducts(filterProductDto);
  }

  @Get("/:id")
  async getProduct(
    @Param("id", UUIDValidationPipe) id: string
  ): Promise<ProductEntity> {
    return this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() productData: CreateProductDto
  ): Promise<ProductEntity> {
    return this.productsService.createProduct(productData);
  }

  @Put(":id")
  async updateProduct(
    @Param() params,
    @Body() productData: EditProductDto
  ): Promise<ProductEntity> {
    return this.productsService.updateProduct(params.id, productData);
  }

  @Delete(":id")
  public async destroyProduct(@Param() params): Promise<void> {
    return this.productsService.destroyProduct(params.id);
  }
}
