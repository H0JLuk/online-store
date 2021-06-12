import { ApiProperty } from '@nestjs/swagger';
import { Device } from 'src/device/models/device';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class DeviceInfo {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Primary memory' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: '8gb' })
  @Column({ nullable: false })
  description: string;

  @Column()
  deviceId: number;
  @ManyToOne(() => Device, (device) => device.devicesInfo)
  @JoinColumn({ name: 'deviceId' })
  device: Device;
}
