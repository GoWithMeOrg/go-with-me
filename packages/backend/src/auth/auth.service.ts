import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async validateUser(userdata: {
        firstName: string;
        lastName: string;
        image: string;
        email: string;
        roles?: string[];
    }): Promise<User> {
        const user = await this.userModel
            .findOne({ email: userdata.email })
            .populate('roles')
            .exec();

        if (user) return user;

        const newUser = new this.userModel({
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            image: userdata.image || '',
            email: userdata.email,
            roles: [],
        });

        const savedUser = await newUser.save();

        return savedUser.populate('roles');
    }
}
