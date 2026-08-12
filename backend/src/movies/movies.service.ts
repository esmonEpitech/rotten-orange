import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movies } from './entities/movie.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private readonly moviesModel: Model<Movies>,
  ) {}
  create(createMovieDto: CreateMovieDto) {
    const movie = new this.moviesModel(createMovieDto);
    return movie.save();
  }

  findAll() {
    return this.moviesModel.find().sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.moviesModel.findById(id);
  }

  findByTmdbId(tmdbId: number){
    return this.moviesModel.findOne({ tmdbId: tmdbId }).exec();
  }

  find20Latest() {
    return this.moviesModel.find().sort({ createdAt: -1 }).limit(20);
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.moviesModel.findByIdAndUpdate(id, updateMovieDto);
  }

  remove(id: string) {
    return this.moviesModel.findByIdAndDelete(id);
  }

  filterByGenre(genre: string) {
    return this.moviesModel.find({ genre: genre });
  }

  filterByReleaseDate(releaseDate: Date) {
    return this.moviesModel.find({ releaseDate: releaseDate });
  }

  filterByProductCompanies(productCompanies: string) {
    return this.moviesModel.find({ productCompanies: productCompanies });
  }

  filterByTitle(title: string) {
    return this.moviesModel.find({title: { $regex: title, $options: 'i',}});
  }

  count() {
    return this.moviesModel.countDocuments();
  }
}
