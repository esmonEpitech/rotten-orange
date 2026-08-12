import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get("count")
  countComment() {
    return this.commentsService.countComment();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }
 @Get("movie/:id")
  async findByMovieId(@Param("id") id: string) {
    const comments = await this.commentsService.findByMovieId(id);

    const result = await Promise.all(
      comments.map(async (movie) => {
        if (!movie.userId) return null;
        const user = await this.usersService.getMe(movie.userId);
        return {
          _id: movie._id,
          movieId: movie.movieId,
          userId: movie.userId,
          username: user?.username ?? "Unknown",
          comment: movie.comment,
        };
      })
    );

    return result.filter((comment) => comment !== null);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
