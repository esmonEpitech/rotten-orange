import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favoris, FavorisSchema } from './entities/favoris.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favoris.name, schema: FavorisSchema },
    ]),
  ],
  controllers: [FavorisController],
  providers: [FavorisService],
  exports: [FavorisService],
})
export class FavorisModule {}
