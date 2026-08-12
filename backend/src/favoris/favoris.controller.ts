import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { CreateFavorisDto } from './dto/create-favoris.dto';
import { UpdateFavorisDto } from './dto/update-favoris.dto';

@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @Post()
  async create(@Body() createFavorisDto: CreateFavorisDto) {
    const existInFavoris =  await this.favorisService.findByUserIdAndMovieId(
      createFavorisDto.userId as string, 
      createFavorisDto.movieId as string
    );
    if (existInFavoris !== null) {
      return {
        message: 'This movie is already in your favoris',
      }
    }
    return this.favorisService.create(createFavorisDto);
  }

  @Get()
  findAll() {
    return this.favorisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favorisService.findOne(id);
  }

  @Get('user/:id')
  finddFavoritByUserId(@Param('id') id: string) {
    return this.favorisService.finddFavoritByUserId(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavorisDto: UpdateFavorisDto) {
    return this.favorisService.update(id, updateFavorisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favorisService.remove(id);
  }

}
