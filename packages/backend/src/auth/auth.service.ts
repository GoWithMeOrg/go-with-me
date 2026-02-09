import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    private readonly userPopulateConfig = {
        path: 'roles',
        populate: {
            path: 'permissions',
            populate: { path: 'resource', select: 'slug' },
        },
    };

    async validateUser(userdata: {
        firstName: string;
        lastName: string;
        image: string;
        email: string;
        roles?: string[];
    }): Promise<User> {
        // const user = await this.userModel
        //     .findOne({ email: userdata.email })
        //     .populate('roles')
        //     .exec();

        const user = await this.userModel
            .findOne({ email: userdata.email })
            .populate(this.userPopulateConfig)
            .exec();

        if (user) return user;

        const newUser = new this.userModel({
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            image: userdata.image || '',
            email: userdata.email,
            roles: userdata.roles || [],
        });

        const savedUser = await newUser.save();

        return savedUser.populate(this.userPopulateConfig);
    }
}
