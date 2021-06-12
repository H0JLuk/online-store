import { ApiProperty } from '@nestjs/swagger';
import { Basket } from 'src/basket/models/basket';
import { Brand } from 'src/brand/models/brand';
import { DeviceInfo } from 'src/device-info/models/deviceInfo';
import { Rating } from 'src/rating/models/rating';
import { Type } from 'src/type/models/type';

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Device {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'iPhone 12' })
  @Column({ unique: true, nullable: false })
  name: string;

  @ApiProperty({ example: 1337 })
  @Column({ nullable: false })
  price: number;

  @ApiProperty({ example: '5.0', default: 0 })
  @Column({ nullable: false, default: 0 })
  rating: number;

  @ApiProperty({ example: 'https://goo.gle/image.jpeg' })
  @Column({ nullable: false })
  img: string;

  @OneToMany(() => DeviceInfo, (deviceInfo) => deviceInfo.device)
  devicesInfo: DeviceInfo[];

  @Column()
  brandId: number;
  @ManyToOne(() => Brand, (brand) => brand.devices)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  typeId: number;
  @ManyToOne(() => Type, (type) => type.devices)
  @JoinColumn({ name: 'typeId' })
  type: Type;

  @OneToMany(() => Rating, (rating) => rating.device)
  ratings: Rating[];

  @ManyToMany(() => Basket)
  baskets: Basket[];
}
