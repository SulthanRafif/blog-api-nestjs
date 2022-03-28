import { AlbumEntity } from 'src/albums/entities/album.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { TodoEntity } from 'src/todos/entities/todo.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from 'src/common/config/role.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @OneToOne(() => AddressEntity, {
    cascade: true,
  })
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.user)
  albums: AlbumEntity[];

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(6);
    if (this.password) {
      this.password = await bcrypt.hash(password || this.password, salt);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
