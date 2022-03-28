import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { EditPostDto } from '../dtos/edit-post.dto';
import { PostEntity } from '../entities/post.entity';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() postData: CreatePostDto) {
    return this.postsService.createPost(postData);
  }

  // @Put('/:id')
  // async updatePost(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() editData: EditPostDto,
  // ) {
  //   return this.postsService.editPost(id, editData);
  // }
}
