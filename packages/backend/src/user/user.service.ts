import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongoSchema } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  getAllUsers() {
    return this.userModel.find();
  }

  getUserById(id: MongoSchema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  createUser(createUserInput: CreateUserInput) {
    const createUser = new this.userModel(createUserInput);
    return createUser.save();
  }

  updateUser(id: MongoSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
    });
  }

  async removeUser(id: MongoSchema.Types.ObjectId): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
}
