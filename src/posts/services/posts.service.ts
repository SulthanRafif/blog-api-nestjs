import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { map } from 'rxjs';
import { CreatePostDto } from '../dtos/create-post.dto';
import { EditPostDto } from '../dtos/edit-post.dto';

@Injectable()
export class PostsService {
  constructor(private httpService: HttpService) {}

  async getPosts() {
    return this.httpService
      .get('http://localhost:3000/posts')
      .pipe(map((response) => response.data));
  }

  async getPost(id: number) {
    return this.httpService
      .get(`http://localhost:3000/posts/${id}`)
      .pipe(map((response) => response.data));
  }

  async createPost(postData: CreatePostDto) {
    return this.httpService
      .post('http://localhost:3000/posts', postData)
      .pipe(map((response) => response.data));
  }

  // async editPost(id: number, postData: EditPostDto) {
  //   return this.httpService.put(`http://localhost:3000/posts/${id}`, {

  //   });
  // }
}
