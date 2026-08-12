import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { User } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(SignUpDto: SignUpDto, filename?: string) {
    const { username, email, password } = SignUpDto;

    const getEmail = await this.userModel.findOne({ email });

    if (getEmail) {
      throw new ConflictException('email déjà existante');
    }

    // if (password.length < 6) {
    //   throw new ConflictException('mdp faible');
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      profile: filename ?? null,
    });

    // const token = this.jwtService.sign({ id: user._id });

    // return { token };
    return {
      message: 'utilisateur créer avec succès',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    };
  }

  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('email ou mot de passe incorrect');
    }

    const mdp = await bcrypt.compare(password, user.password);
    if (!mdp) {
      throw new UnauthorizedException('email ou mot de passe incorrect');
    }

    const token = this.jwtService.sign({
      userId: user._id,
      email: user.email,
      role: user.role,
    });
    return {
      acces_token: token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    };
  }
}
