import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'geos' })
export class GeoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @OneToOne(() => AddressEntity, (address) => address.geo)
  address: AddressEntity;
}
