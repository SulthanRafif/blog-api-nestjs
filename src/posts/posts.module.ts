import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './services/posts.service';
import { HttpModule } from '@nestjs/axios';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    HttpModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
