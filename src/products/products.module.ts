import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEntity } from 'src/catalogues/entities/catalog.entity';
import { CataloguesService } from 'src/catalogues/services/catalogues.service';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/services/categories/categories.service';
import { ProductsController } from './controllers/products.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([CatalogEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CataloguesService, CategoriesService],
})
export class ProductsModule {}
