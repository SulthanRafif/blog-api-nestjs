import { AlbumEntity } from 'src/albums/entities/album.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'photos' })
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  thumbnailUrl: string;

  @ManyToOne(() => AlbumEntity, (album) => album.photos, {
    cascade: true,
  })
  album: AlbumEntity;
}
