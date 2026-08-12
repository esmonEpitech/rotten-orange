import {
    IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
    @IsNumber()
    @IsNotEmpty()
    readonly tmdbId?: number;

    @IsString()
    @IsNotEmpty()
    readonly title?: string;

    @IsString()
    @IsNotEmpty()
    readonly description?: string;

    @IsString()
    @IsNotEmpty()
    readonly genre?: string[];

    @IsDate()
    @IsNotEmpty()
    readonly releaseDate?: Date;

    @IsString()
    @IsNotEmpty()
    readonly productCompanies?: string[];

    @IsNumber()
    @IsNotEmpty()
    readonly productionBudget?: number;

    @IsString()
    @IsNotEmpty()
    readonly imagPath?: string;

    @IsString()
    @IsNotEmpty()
    readonly trailerPath?: string;

    @IsString()
    @IsNotEmpty()
    readonly producer?: { name: string; profilePath: string | null }[];

    @IsString()
    @IsNotEmpty()
    readonly director?: { name: string; profilePath: string | null }[];

    @IsString()
    @IsNotEmpty()
    readonly cast?: string[];

}
