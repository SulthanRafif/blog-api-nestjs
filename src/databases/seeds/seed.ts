import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user-seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const usersSeeder = appContext.get(UserSeedService);
  await usersSeeder.seed();
}

bootstrap();
