import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CatalogEntity } from 'src/catalogues/entities/catalog.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import databaseConfig from 'src/common/config/database.config';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductSeedService } from './product-seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('database');

        return options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CategoryEntity, CatalogEntity, ProductEntity]),
  ],

  providers: [ProductSeedService],
})
export class SeedModule {}
