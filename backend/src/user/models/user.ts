import { ApiProperty } from '@nestjs/swagger';
import { Basket } from 'src/basket/models/basket';
import { Rating } from 'src/rating/models/rating';
import { Role } from 'src/role/models/role';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 's@mail.ru' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '12345Aa!' })
  @Column()
  password: string;

  @OneToOne(() => Basket)
  basket: Basket;

  @Column()
  roleId: number;
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
