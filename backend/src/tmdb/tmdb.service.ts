import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { profile } from 'console';

@Injectable()
export class TmdbService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly imageBaseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2NlNTVkZDhkNjlmZDUyYjFkNGYyNDYyYmQ3MjAwYSIsIm5iZiI6MTc3OTEwNTE2MC4zMTEsInN1YiI6IjZhMGFmZDg4ZmNmNzE0NDMxZjQzYjgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._hZEZLGH8-jCsBIhHq0kk9eKyOT9qIsGGm1TZDqPYRs';
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  }
  private get headers() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  async findByTitle(title: string) {
    const url = `${this.baseUrl}/search/movie`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.headers,
        params: {
          query: title,
        },
      }),
    );

    const movies = response.data.results.map((movie: any) => ({
      tmdbId: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      // imagPath: this.imageBaseUrl + (movie.poster_path) || movie.poster_path
      imagPath: movie.poster_path
        ? this.imageBaseUrl + movie.poster_path
        : null,
    }));

    return movies;
  }

  async findAll() {
    const url = `${this.baseUrl}/movie/popular`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.headers,
      }),
    );

    return response.data;
  }

  async findById(id: number) {
    const url = `${this.baseUrl}/movie/${id}`;
    const videos = await this.getTrailer(id);

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.headers,
      }),
    );
    const movie = {
      tmdbId: response.data.id,
      title: response.data.title,
      description: response.data.overview,
      genre: response.data.genres.map((genre: any) => genre.name),
      releaseDate: response.data.release_date,
      productCompanies: response.data.production_companies.map(
        (company: any) => company.name,
      ),
      productionBudget: response.data.budget,
      imagPath:
        this.imageBaseUrl + response.data.poster_path ||
        response.data.poster_path,
      trailer: videos ? videos : { message: 'Trailer not found' },
    };

    return movie;
  }
  getImagePath(path: string) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }

  async getTrailer(id: number) {
    const url = `${this.baseUrl}/movie/${id}/videos`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }),
    );

    const videos = response.data.results;
    const trailer = videos.find(
      (v: any) => v.site === 'YouTube' && v.type === 'Trailer',
    );
    if (!trailer) {
      return { message: 'Trailer not found' };
    }
    const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;

    return {
      key: trailer.key,
      trailerUrl: trailer.key,
    };
  }

  async getProuctorDirectorAndActors(id: number) {
    const url = `${this.baseUrl}/movie/${id}/credits`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.headers,
      }),
    );
    
    const crew = response.data.crew;
    const director = crew.find((c: any) => c.job === 'Director');
    const producer = crew.find((c: any) => c.job === 'Producer');

    return {
      director: director
        ? {
            name: director.name,
            profilePath: director.profile_path
              ? this.imageBaseUrl + director.profile_path
              : null,
          }
        : null,

      producer: producer
        ? {
            name: producer.name,
            profilePath: producer.profile_path
              ? this.imageBaseUrl + producer.profile_path
              : null,
          }
        : null,

      cast: response.data.cast.map((c: any) => ({
        name: c.name,
        profilePath: c.profile_path ? this.imageBaseUrl + c.profile_path : null,
      })),
    };
  }
}
