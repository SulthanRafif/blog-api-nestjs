import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeoEntity } from './geo.entity';

@Entity({ name: 'addresses' })
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @OneToOne(() => GeoEntity, {
    cascade: true,
  })
  @JoinColumn()
  geo: GeoEntity;
}
