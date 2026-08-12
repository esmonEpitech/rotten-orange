import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { CreateTmdbDto } from './dto/create-tmdb.dto';
import { UpdateTmdbDto } from './dto/update-tmdb.dto';
import { MoviesService } from 'src/movies/movies.service';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tmdb')
export class TmdbController {
  constructor(
    private readonly tmdbService: TmdbService,
    private readonly moviesService: MoviesService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTmdbDto: CreateTmdbDto) {
    return this.tmdbService.findByTitle(createTmdbDto.title || '');
  }

  @Get()
  findAll() {
    return this.tmdbService.findAll();
  }

@UseGuards(AuthGuard('jwt'))
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number,) {
  const movie = await this.tmdbService.findById(id);
  if (!movie) {
    return {
      message: 'Movie not found',
    };
  }

  const existingMovie = await this.moviesService.findByTmdbId(movie.tmdbId);
  if (existingMovie) {
    return {
      message: 'Movie already exists',
    };
  }

  const person = await this.tmdbService.getProuctorDirectorAndActors(id);
  const createMovieDto: CreateMovieDto = {
    tmdbId: movie.tmdbId,
    title: movie.title,
    description: movie.description,
    genre: movie.genre,
    releaseDate: movie.releaseDate,
    productCompanies: movie.productCompanies,
    productionBudget: movie.productionBudget,
    imagPath: movie.imagPath,
    trailerPath: movie.trailer?.trailerUrl ?? 'null',
    producer: person?.producer ? [person.producer] : [],
    director: person?.director ? [person.director] : [],
    cast: person?.cast ?? [],
  };

  const createdMovie = await this.moviesService.create(createMovieDto);

  return {
    message: 'Movie created',
    movie: createdMovie,
  };

  // return createMovieDto;

}

  @Get('/trailer/:id')
  getTrailer(@Param('id') id: number) {
    return this.tmdbService.getTrailer(id);
  }
}
