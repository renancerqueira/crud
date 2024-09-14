import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: any): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
