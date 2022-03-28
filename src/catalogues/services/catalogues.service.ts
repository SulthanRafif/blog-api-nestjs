import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { FindConditions, Repository } from "typeorm";
import { CreateCatalogDto } from "../dtos/create-catalog.dto";
import { EditCatalogDto } from "../dtos/edit-catalog.dto";
import { FilterCatalogDto } from "../dtos/filter-catalog.dto";
import { CatalogEntity } from "../entities/catalog.entity";

@Injectable()
export class CataloguesService {
  constructor(
    @InjectRepository(CatalogEntity)
    private catalogRepository: Repository<CatalogEntity>
  ) {}

  async getCatalogues(
    filterCatalogDto: FilterCatalogDto
  ): Promise<CatalogEntity[]> {
    let filter: FindConditions<CatalogEntity> = {};
    if (filterCatalogDto.search) {
      filter = { name: filterCatalogDto.search };
    }
    const catalogues = await this.catalogRepository.find(filter);

    return catalogues;
  }

  async getCatalogById(id: string): Promise<CatalogEntity> {
    const catalog = await this.catalogRepository.findOne(id);
    if (!catalog) {
      throw new NotFoundException(`Catalog with id ${id} is not found`);
    }
    return catalog;
  }

  async createCatalog(catalogData: CreateCatalogDto): Promise<CatalogEntity> {
    const catalogEntity = this.catalogRepository.create(catalogData);
    await this.catalogRepository.save(catalogEntity);

    return catalogEntity;
  }

  async updateCatalog(id: string, catalogData: EditCatalogDto): Promise<CatalogEntity> {
    const { name } = catalogData;
    const catalog = await this.getCatalogById(id);
    catalog.name = name;

    await catalog.save();

    return catalog;
  }

  async destroyCatalog(id: number): Promise<void> {
    const result = await this.catalogRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Catalog with id ${id} is not found`);
    }
  }
}
