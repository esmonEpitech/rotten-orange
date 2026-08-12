import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';
import { InjectModel } from '@nestjs/mongoose';
import { Ratings } from './entities/rating.entity';
import { Model } from 'mongoose';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Ratings.name) private readonly ratingsModel: Model<Ratings>,
  ) {}
  create(createRatingDto: CreateRatingDto) {
    return this.ratingsModel.create(createRatingDto);
  }

  findAll() {
    return this.ratingsModel.find().sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.ratingsModel.findById(id);
  }

  findByUserIdAndMovieId(userId: string, movieId: string) {
    return this.ratingsModel.findOne({
      userId: userId,
      movieId: movieId,
    });
  }

  update(id: string, updateRatingDto: UpdateRatingDto) {
    return this.ratingsModel.findByIdAndUpdate(id, updateRatingDto);
  }

  remove(id: string) {
    return this.ratingsModel.findByIdAndDelete(id);
  }

  calculateAverageRatingForMovie(movieId: string) {
    return this.ratingsModel.find({ movieId }).then((ratings) => {
      const totalRating = ratings.reduce(
        (acc, rating) => acc + (rating.score ?? 0),
        0
      );

      const averageRating =
        ratings.length > 0 ? totalRating / ratings.length : 0;

      return averageRating;
    });
  }
}
