import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto) {
    const exist = await this.ratingsService.findByUserIdAndMovieId(
      createRatingDto.userId as string,
      createRatingDto.movieId as string
    );
    if (exist !== null) {
      return {
        message: 'You already rated this movie',
      }
    }
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(id);
  }

  @Get('user/:userId/movie/:movieId')
  getByUserIdAndMovieId(@Param('userId') userId: string, @Param('movieId') movieId: string) {
    return this.ratingsService.findByUserIdAndMovieId(userId, movieId);
  }

  @Get('movie/:movieId')
  calculateAverageRatingForMovie(@Param('movieId') movieId: string) {
    return this.ratingsService.calculateAverageRatingForMovie(movieId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(id);
  }
}
