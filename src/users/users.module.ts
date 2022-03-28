import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [HttpModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
