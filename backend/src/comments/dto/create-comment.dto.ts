import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    readonly userId?: string

    @IsString()
    @IsNotEmpty()
    readonly movieId?: string
    @IsString()
    @IsNotEmpty()
    readonly comment?: string
}
