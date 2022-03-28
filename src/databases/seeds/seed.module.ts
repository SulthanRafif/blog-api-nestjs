import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import databaseConfig from 'src/common/config/database.config';
import { TableSeedService } from './table-seed.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { GeoEntity } from 'src/users/entities/geo.entity';
import { AddressEntity } from 'src/users/entities/address.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { PhotoEntity } from 'src/photos/entities/photo.entity';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import { UserSeedService } from './user-seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('database');

        return options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      GeoEntity,
      AddressEntity,
      PostEntity,
      CommentEntity,
      AlbumEntity,
      PhotoEntity,
      TodoEntity,
    ]),
  ],

  providers: [TableSeedService, UserSeedService],
})
export class SeedModule {}
