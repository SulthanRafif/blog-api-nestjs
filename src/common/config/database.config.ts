import { registerAs } from '@nestjs/config';
import { AddressEntity } from 'src/auth/entities/address.entity';
import { GeoEntity } from 'src/auth/entities/geo.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CatalogEntity } from 'src/catalogues/entities/catalog.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncronize: false,
  entities: [
    CategoryEntity,
    CatalogEntity,
    ProductEntity,
    UserEntity,
    AddressEntity,
    GeoEntity,
  ],
}));
