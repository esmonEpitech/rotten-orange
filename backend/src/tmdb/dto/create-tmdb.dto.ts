import { IsNotEmpty, IsString } from "class-validator";

export class CreateTmdbDto {

    @IsString()
    @IsNotEmpty()
    readonly title?: string;
}
