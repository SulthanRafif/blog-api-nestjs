import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UUIDValidationPipe } from 'src/common/pipes/uuid-validation.pipe';
import { CreateCatalogDto } from '../dtos/create-catalog.dto';
import { EditCatalogDto } from '../dtos/edit-catalog.dto';
import { FilterCatalogDto } from '../dtos/filter-catalog.dto';
import { CatalogEntity } from '../entities/catalog.entity';
import { CataloguesService } from '../services/catalogues.service';

@Controller('catalogues')
export class CataloguesController {
  constructor(private cataloguesService: CataloguesService) {}

  @Get()
  public async getCatalogues(
    @Query() filterCatalogDto: FilterCatalogDto,
  ): Promise<CatalogEntity[]> {
    return this.cataloguesService.getCatalogues(filterCatalogDto);
  }

  @Get('/:id')
  async geCatalog(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<CatalogEntity> {
    return this.cataloguesService.getCatalogById(id);
  }

  @Post()
  async createCatalog(
    @Body() catalogData: CreateCatalogDto,
  ): Promise<CatalogEntity> {
    return this.cataloguesService.createCatalog(catalogData);
  }

  @Put(':id')
  public async updateCatalog(
    @Param() params,
    @Body() catalogData: EditCatalogDto,
  ): Promise<CatalogEntity> {
    return this.cataloguesService.updateCatalog(params.id, catalogData);
  }

  @Delete(':id')
  public async destroyCatalog(@Param() params): Promise<void> {
    return this.cataloguesService.destroyCatalog(params.id);
  }
}
