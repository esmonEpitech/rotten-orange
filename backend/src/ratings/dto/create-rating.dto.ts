import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    readonly userId?: string;

    @IsString()
    @IsNotEmpty()
    readonly movieId?: string;

    @IsNumber()
    @IsNotEmpty()
    readonly score?: number;
}
