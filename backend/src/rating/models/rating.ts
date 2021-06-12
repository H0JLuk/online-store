import { ApiProperty } from '@nestjs/swagger';
import { Device } from 'src/device/models/device';
import { User } from 'src/user/models/user';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Rating {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 3.5 })
  @Column({ nullable: false })
  rate: number;

  @Column()
  deviceId: number;
  @ManyToOne(() => Device, (device) => device.ratings)
  @JoinColumn({ name: 'deviceId' })
  device: Device;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: 'userId' })
  user: User;
}
