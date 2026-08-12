import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ratings, RatingSchema } from './entities/rating.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ratings.name, schema: RatingSchema },
    ]),
  ],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService],
})
export class RatingsModule {}
