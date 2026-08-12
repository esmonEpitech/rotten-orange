import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'password lower' })
  readonly password: string;
}
