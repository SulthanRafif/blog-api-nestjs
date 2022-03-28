import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'geos' })
export class GeoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  lat: string;

  @Column()
  lng: string;
}
