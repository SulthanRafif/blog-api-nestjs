import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { RoleEnum } from 'src/common/config/role.enum';
import { PhotoEntity } from 'src/photos/entities/photo.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { AddressEntity } from 'src/users/entities/address.entity';
import { GeoEntity } from 'src/users/entities/geo.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TableSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,

    @InjectRepository(GeoEntity)
    private geoRepository: Repository<GeoEntity>,

    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,

    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async seed(): Promise<void> {
    // Seed Admin Data In Users Table

    const geo_admin = this.geoRepository.create({
      lat: '-37.3159',
      lng: '81.1496',
    });

    await this.geoRepository.save(geo_admin);

    const address_admin = this.addressRepository.create({
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: geo_admin,
    });

    await this.addressRepository.save(address_admin);

    const admin = this.userRepository.create({
      name: 'Leanne Graham',
      username: 'Admin',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      address: address_admin,
      password: 'password',
      role: RoleEnum.Admin,
    });

    await this.userRepository.save(admin);

    const geo_user = this.geoRepository.create({
      lat: '-37.3159',
      lng: '81.1496',
    });

    await this.geoRepository.save(geo_user);

    const address_user = this.addressRepository.create({
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: geo_user,
    });

    await this.addressRepository.save(address_user);

    const user = this.userRepository.create({
      name: 'Leanne Graham',
      username: 'user',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      address: address_user,
      password: 'password',
      role: RoleEnum.User,
    });

    await this.userRepository.save(user);

    // Seed Post And Comment Data In Posts And Comments Table

    const post = this.postRepository.create({
      user: user,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    });

    await this.postRepository.save(post);

    const comment_1 = this.commentRepository.create({
      post: post,
      name: user.name,
      email: user.email,
      body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    });

    await this.commentRepository.save(comment_1);

    const comment_2 = this.commentRepository.create({
      post: post,
      name: user.name,
      email: user.email,
      body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
    });

    await this.commentRepository.save(comment_2);

    // Seed Album And Photo Data In Albums And Photos Table

    const album = this.albumRepository.create({
      user: user,
      title: 'quidem molestiae enim',
    });

    await this.albumRepository.save(album);

    const photo_1 = this.photoRepository.create({
      album: album,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    });

    await this.photoRepository.save(photo_1);

    const photo_2 = this.photoRepository.create({
      album: album,
      title: 'reprehenderit est deserunt velit ipsam',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796',
    });

    await this.photoRepository.save(photo_2);

    // Seed Todo Data In Todos Table

    const todo = this.todoRepository.create({
      user: user,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    });

    await this.todoRepository.save(todo);
  }
}
