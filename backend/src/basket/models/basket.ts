import { ApiProperty } from '@nestjs/swagger';

import { Device } from 'src/device/models/device';
import { User } from 'src/user/models/user';
import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinTable, JoinColumn, Column } from 'typeorm';

@Entity()
export class Basket {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Device)
  @JoinTable()
  devices: Device[];
}
