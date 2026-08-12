import { Injectable } from '@nestjs/common';
import { CreateFavorisDto } from './dto/create-favoris.dto';
import { UpdateFavorisDto } from './dto/update-favoris.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Favoris } from './entities/favoris.entity';
import { Model } from 'mongoose';

@Injectable()
export class FavorisService {
  constructor(
    @InjectModel(Favoris.name) private readonly favorisModel: Model<Favoris>,
  ) {}
  create(createFavorisDto: CreateFavorisDto) {
    return this.favorisModel.create(createFavorisDto);
  }

  findAll() {
    return this.favorisModel.find().sort({ createdAt: -1 });
  }

   findByUserIdAndMovieId(userId: string,  movieId: string){
    return this.favorisModel.findOne({
      userId: userId,
      movieId: movieId 
    }).exec();
  }
  findOne(id: string) {
    return this.favorisModel.findById(id);
  }

  update(id: string, updateFavorisDto: UpdateFavorisDto) {
    return this.favorisModel.findByIdAndUpdate(id, updateFavorisDto);
  }

  remove(id: string) {
    return this.favorisModel.findByIdAndDelete(id);
  }

  finddFavoritByUserId(userId: string){
    return this.favorisModel.find({userId: userId}).exec();
  }
}
