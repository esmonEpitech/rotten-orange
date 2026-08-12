import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Movies {

    @Prop({required: true})
    tmdbId?: number;
    
    @Prop({required: true})
    title?: string;

    @Prop({required: true})
    description?: string;

    @Prop({required: true})
    genre?: string[];

    @Prop({required: true})
    releaseDate?: Date;

    @Prop({required: true})
    productCompanies?: string[];

    @Prop({required: true})
    productionBudget?: number;

    @Prop({required: true})
    imagPath?: string;

    @Prop({required: true})
    trailerPath?: string;

    @Prop({required: true})
    producer?:  {name: string; profilePath: string | null }[];

    @Prop({required: true})
    director?: { name: string; profilePath: string | null }[];

    @Prop({required: true})
    cast?: string[];
    
}
export const MovieSchema = SchemaFactory.createForClass(Movies);