import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/brand/models/brand';
import { Device } from 'src/device/models/device';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Type {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Phone' })
  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Device, (device) => device.type)
  devices: Device[];

  @ManyToMany(() => Brand)
  @JoinTable()
  brands: Brand[];
}
