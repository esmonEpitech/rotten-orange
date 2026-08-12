import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,

  ) {}
  create(createCommentDto: CreateCommentDto) {

    return this.commentsModel.create(createCommentDto);
  }

  findAll() {
    return this.commentsModel.find().sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.commentsModel.findById(id);
  }
  findByMovieId(id: string) {
    return this.commentsModel.find({ movieId: id }).sort({ createdAt: -1 });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentsModel.findByIdAndUpdate(id, updateCommentDto);
  }

  remove(id: string) {
    return this.commentsModel.findByIdAndDelete(id);
  }

  countComment(){
    return this.commentsModel.countDocuments();
  }
}
