import { Module } from '@nestjs/common';
import { TmdbService } from './tmdb.service';
import { TmdbController } from './tmdb.controller';
import { HttpModule } from '@nestjs/axios';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [
    HttpModule,
    MoviesModule,
  ],
  controllers: [TmdbController],
  providers: [TmdbService],
})
export class TmdbModule {}
