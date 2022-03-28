import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeoEntity } from './geo.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'addresses' })
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @OneToOne(() => UserEntity, (user) => user.address)
  user: UserEntity;

  @OneToOne(() => GeoEntity, (geo) => geo.address)
  @JoinColumn()
  geo: GeoEntity;
}
