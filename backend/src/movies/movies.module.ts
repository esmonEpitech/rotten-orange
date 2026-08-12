import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Mongoose } from 'mongoose';
import { Movies, MovieSchema } from './entities/movie.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsModule } from 'src/ratings/ratings.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MovieSchema }]),
    RatingsModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],

})
export class MoviesModule {}
