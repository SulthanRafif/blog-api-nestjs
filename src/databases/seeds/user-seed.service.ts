import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/common/config/role.enum';
import { AddressEntity } from 'src/users/entities/address.entity';
import { GeoEntity } from 'src/users/entities/geo.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,

    @InjectRepository(GeoEntity)
    private geoRepository: Repository<GeoEntity>,
  ) {}

  async seed(): Promise<void> {
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
  }
}
