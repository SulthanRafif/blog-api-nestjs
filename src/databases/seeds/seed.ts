import { NestFactory } from '@nestjs/core';
import { ProductSeedService } from './product-seed.service';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const productSeeder = appContext.get(ProductSeedService);
  await productSeeder.seed();
}

bootstrap();
