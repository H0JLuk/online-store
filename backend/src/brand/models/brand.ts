import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Device } from 'src/device/models/device';
import { Type } from 'src/type/models/type';

@Entity()
export class Brand {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Apple' })
  @Column({ unique: true, nullable: false })
  name: string;

  @ApiProperty({
    example: [Device],
    description: 'Devices which belongs to brand',
    required: false,
  })
  @OneToMany(() => Device, (device) => device.brand)
  devices: Device[];

  @ManyToMany(() => Type, { cascade: true })
  @JoinTable({
    name: 'brands_types',
    joinColumn: { name: 'brandId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'typeId', referencedColumnName: 'id' },
  })
  types: Type[];
}
