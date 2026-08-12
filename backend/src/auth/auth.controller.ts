import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import type { File as MulterFile } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() file?: any,
  ): Promise<{ message: string }> {
    const filename = file?.filename;
    return this.authService.signUp(signUpDto, filename);
  }

  @Post('login')
  signIn(@Body() loginDto: LoginDto): Promise<{ acces_token: string }> {
    return this.authService.login(loginDto);
  }
}
