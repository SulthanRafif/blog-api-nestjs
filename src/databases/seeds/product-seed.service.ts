import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogEntity } from 'src/catalogues/entities/catalog.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(CatalogEntity)
    private catalogRepository: Repository<CatalogEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async seed(): Promise<void> {
    const category_1 = this.categoryRepository.create({
      title: 'sport',
      description: 'sport category',
      total_products: 1,
    });
    await this.categoryRepository.save(category_1);

    const category_2 = this.categoryRepository.create({
      title: 'hobby',
      description: 'hobby category',
      total_products: 1,
    });
    await this.categoryRepository.save(category_2);

    const catalog = this.catalogRepository.create({
      name: 'catalog one',
    });
    await this.catalogRepository.save(catalog);

    const product = this.productRepository.create({
      name: 'Ball',
      stock: 10,
      price: 100000,
      description: 'Ball for Football',
      catalog: catalog,
      categories: [category_1, category_2],
    });
    await this.productRepository.save(product);
  }
}
