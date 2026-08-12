import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { FavorisModule } from './favoris/favoris.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MoviesModule,
    RatingsModule,
    CommentsModule,
    FavorisModule,
    TmdbModule,
    MongooseModule.forRoot(
      'mongodb+srv://esmonsossie27_db_user:Zwfdrp40BwslBSjD@cluster0.bmgnvtp.mongodb.net/?appName=Cluster0',
      // 'mongodb://localhost:27017/myrottentomatoes',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
