import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CataloguesService } from 'src/catalogues/services/catalogues.service';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { FindConditions, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { EditProductDto } from '../dtos/edit-product.dto';
import { FilterProductDto } from '../dtos/filter-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private cataloguesService: CataloguesService,
    private categoriesService: CategoriesService,
  ) {}

  async getProducts(
    filterProductDto: FilterProductDto,
  ): Promise<ProductEntity[]> {
    let filter: FindConditions<ProductEntity> = {};
    if (filterProductDto.search) {
      filter = { name: filterProductDto.search };
    }

    const products = await this.productRepository.find({
      where: filter,
      select: [
        'id',
        'name',
        'stock',
        'price',
        'description',
        'created_at',
        'updated_at',
      ],
    });

    return products;
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: ['catalog', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
    return product;
  }

  async createProduct(productData: CreateProductDto): Promise<ProductEntity> {
    const catalog = await this.cataloguesService.getCatalogById(
      productData.catalogId,
    );

    const category = [];

    for (let i = 0; i < productData.categoryId.length; i++) {
      category.push(
        await this.categoriesService.getCategoryById(productData.categoryId[i]),
      );
    }

    const { name, stock, price, description } = productData;

    const product = this.productRepository.create({
      name: name,
      stock: stock,
      price: price,
      catalog: catalog,
      description: description,
      categories: category,
    });

    await this.productRepository.save(product);

    return product;
  }

  async updateProduct(
    id: string,
    productData: EditProductDto,
  ): Promise<ProductEntity> {
    const catalog = await this.cataloguesService.getCatalogById(
      productData.catalogId,
    );

    const category = [];

    for (let i = 0; i < productData.categoryId.length; i++) {
      category.push(
        await this.categoriesService.getCategoryById(productData.categoryId[i]),
      );
    }

    const { name, stock, price, description } = productData;

    const product = await this.getProductById(id);

    (product.name = name),
      (product.stock = stock),
      (product.price = price),
      (product.description = description),
      (product.catalog = catalog),
      (product.categories = category);

    await product.save();

    return product;
  }

  async destroyProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
  }
}
