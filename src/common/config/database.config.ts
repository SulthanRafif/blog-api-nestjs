import { registerAs } from '@nestjs/config';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { PhotoEntity } from 'src/photos/entities/photo.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { AddressEntity } from 'src/users/entities/address.entity';
import { GeoEntity } from 'src/users/entities/geo.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  syncronize: false,
  entities: [
    PostEntity,
    CommentEntity,
    AlbumEntity,
    UserEntity,
    AddressEntity,
    GeoEntity,
    AlbumEntity,
    PhotoEntity,
    TodoEntity,
  ],
}));
