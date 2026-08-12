import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Comments {

    @Prop({ required: true })
    userId?: string
    @Prop({ required: true })
    movieId?: string
    @Prop({ required: true })
    comment?: string
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
