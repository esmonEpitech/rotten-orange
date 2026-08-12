import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Ratings {

    @Prop({ required: true })
    userId?: string
    @Prop({ required: true })
    movieId?: string
    @Prop({ required: true })
    score?: number
}
export const RatingSchema = SchemaFactory.createForClass(Ratings);