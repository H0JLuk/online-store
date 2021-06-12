import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketService } from './basket.service';
import { Basket } from './models/basket';

@Module({
  imports: [TypeOrmModule.forFeature([Basket])],
  providers: [BasketService],
})
export class BasketModule {}
