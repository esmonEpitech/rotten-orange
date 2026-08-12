import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { response } from 'express';
import { RatingsService } from 'src/ratings/ratings.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly ratingsService: RatingsService,
  ) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    const existingMovie = await this.moviesService.findByTmdbId(
      createMovieDto.tmdbId as number,
    );
    if (existingMovie !== null) {
      return {
        message: 'Movie already exists',
        movie: existingMovie,
      };
    }
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('latest')
  find20Latest() {
    return this.moviesService.find20Latest();
  }
  @Get('count')
  count() {
    return this.moviesService.count();
  }
  @Get('topratings')
  async findTopRatings() {
    const movies = await this.moviesService.findAll();

    const moviesWithRatings = await Promise.all(
      movies.map(async (movie) => {
        const avgRating = await this.ratingsService.calculateAverageRatingForMovie(movie._id.toString());

        return {
          ...movie.toObject(),
          averageRating: avgRating,
        };
      }),
    );

    return moviesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
  }

  @Get('top5')
  async findTop5() {
  const movies = await this.findTopRatings();

  return movies.slice(0, 5);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  @Get('genre/:genre')
  filterByGenre(@Param('genre') genre: string) {
    return this.moviesService.filterByGenre(genre);
  }

  @Get('releaseDate/:releaseDate')
  filterByReleaseDate(@Param('releaseDate') releaseDate: Date) {
    return this.moviesService.filterByReleaseDate(releaseDate);
  }

  @Get('productCompanies/:productCompanies')
  filterByProductCompanies(
    @Param('productCompanies') productCompanies: string,
  ) {
    return this.moviesService.filterByProductCompanies(productCompanies);
  }

  @Get('title/:title')
  filterByTitle(@Param('title') title: string) {
    return this.moviesService.filterByTitle(title);
  }
}
