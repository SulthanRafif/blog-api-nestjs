import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CataloguesController } from './controllers/catalogues.controller';
import { CatalogEntity } from './entities/catalog.entity';
import { CataloguesService } from './services/catalogues.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogEntity])],
  controllers: [CataloguesController],
  providers: [CataloguesService],
})
export class CataloguesModule {}
