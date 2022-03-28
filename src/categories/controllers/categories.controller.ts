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
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { EditCategoryDto } from "../dtos/edit-category.dto";
import { FilterCategoryDto } from "../dtos/filter-category.dto";
import { CategoryEntity } from "../entities/category.entity";
import { CategoriesService } from "../services/categories/categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  public async getCategories(
    @Query() filterCategoryDto: FilterCategoryDto
  ): Promise<CategoryEntity[]> {
    return this.categoriesService.getCategories(filterCategoryDto);
  }

  @Get("/:id")
  async getCategory(
    @Param("id", UUIDValidationPipe) id: string
  ): Promise<CategoryEntity> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  async createCategory(
    @Body() categoryData: CreateCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoriesService.createCategory(categoryData);
  }

  @Put(":id")
  public async updateCategory(
    @Param() params,
    @Body() categoryData: EditCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoriesService.updateCategory(params.id, categoryData);
  }

  @Delete(":id")
  public async destroyCategory(@Param() params): Promise<void> {
    return this.categoriesService.destroyCategory(params.id);
  }
}
