import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './controllers/comments.controller';
import { CommentEntity } from './entities/comment.entity';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
