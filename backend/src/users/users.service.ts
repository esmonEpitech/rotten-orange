import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  async getMe(userId: string) {
    return this.findById(userId);
  }

  async update(id: string, dto: UpdateUserDto, requester: User) {
    const isAdmin = requester.role === 'admin';
    const isOwner = requester.id === id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException('Action non autorisée');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password');

    if (!updated) throw new NotFoundException('Utilisateur introuvable');
    return updated;
  }

  async remove(id: string, requester: User) {
    const isAdmin = requester.role === 'admin';
    const isOwner = requester.id === id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException('Action non autorisée');
    }

    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Utilisateur introuvable');

    return { message: 'Compte supprimé', deleted };
  }

  async updateProfile(userId: string, filename: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    if (user.profile) {
      const oldPath = `./uploads/${user.profile}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    return this.userModel
      .findByIdAndUpdate(userId, { profile: filename }, { new: true })
      .select('-password');
  }

  async addToAdmin(id: string) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { role: 'admin' }, { new: true })
      .select('-password');

    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  async countUsers() {
    return this.userModel.countDocuments();
  }
}
