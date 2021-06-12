import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeService } from './type.service';
import { Type } from './models/type';
import { TypeController } from './type.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Type]), AuthModule],
  providers: [TypeService],
  controllers: [TypeController],
})
export class TypeModule {}
