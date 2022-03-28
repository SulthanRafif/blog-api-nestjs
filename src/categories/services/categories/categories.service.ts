import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto } from "src/categories/dtos/create-category.dto";
import { EditCategoryDto } from "src/categories/dtos/edit-category.dto";
import { FilterCategoryDto } from "src/categories/dtos/filter-category.dto";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { FindConditions, Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async getCategories(
    filterCategoryDto: FilterCategoryDto
  ): Promise<CategoryEntity[]> {
    let filter: FindConditions<CategoryEntity> = {};
    if (filterCategoryDto.search) {
      filter = { title: filterCategoryDto.search };
    }
    const categories = await this.categoryRepository.find({
      where: filter,
      select: ["id", "description", "title", "created_at", "updated_at"],
    });

    return categories;
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} is not found`);
    }
    return category;
  }

  async createCategory(
    categoryData: CreateCategoryDto
  ): Promise<CategoryEntity> {
    const { title, description } = categoryData;

    const category = this.categoryRepository.create({
      title: title,
      description: description,
    });

    await this.categoryRepository.save(category);

    return category;
  }

  async updateCategory(
    id: string,
    categoryData: EditCategoryDto
  ): Promise<CategoryEntity> {
    const { title, description } = categoryData;
    const category = await this.getCategoryById(id);
    category.title = title;
    category.description = description;

    await category.save();

    return category;
  }

  async destroyCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Category with id ${id} is not found`);
    }
  }
}
