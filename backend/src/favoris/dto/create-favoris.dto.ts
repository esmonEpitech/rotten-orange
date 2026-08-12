import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavorisDto {

    @IsString()
    @IsNotEmpty()
    readonly userId?: string

    @IsString()
    @IsNotEmpty()
    readonly movieId?: string
}
