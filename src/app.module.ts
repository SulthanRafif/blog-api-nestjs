import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './common/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './common/config/configuration';
import {
  APP_FILTER,
  APP_INTERCEPTOR,
  APP_PIPE,
  RouterModule,
} from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PhotosModule } from './photos/photos.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
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
    RouterModule.register([
      {
        path: 'v1',
        children: [
          { path: '/', module: UsersModule },
          { path: '/', module: PostsModule },
          { path: '/', module: CommentsModule },
          { path: '/', module: AuthModule },
        ],
      },
    ]),
    UsersModule,
    CommentsModule,
    PostsModule,
    AuthModule,
    PhotosModule,
    TodosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
