import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandController } from './brand.controller';
import { Brand } from './models/brand';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), AuthModule],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
