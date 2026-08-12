import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Favoris {

    @Prop({ required: true })
    userId?: string;

    @Prop({ required: true })
    movieId?: string;
}

export const FavorisSchema = SchemaFactory.createForClass(Favoris);
