import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './models/rating';
import { RatingService } from './rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingService],
})
export class RatingModule {}
