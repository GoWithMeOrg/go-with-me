import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/modules/user/entities/user.entity';

@Injectable()
export class SessionSerializer {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    serializeUser(user: Partial<User>, done: Function) {
        done(null, user._id); // сохраняем только ID в сессии
    }

    async deserializeUser(id: string, done: Function) {
        try {
            const user = await this.userModel
                .findById(id)
                .populate({
                    path: 'roles',
                    populate: {
                        path: 'permissions',
                        populate: { path: 'resource' },
                    },
                })
                .lean();

            const userSession = {
                _id: user?._id,
                email: user?.email,
                firstName: user?.firstName,
                lastName: user?.lastName,
                roles: user?.roles,
            };

            done(null, userSession);
        } catch (err) {
            done(err, null);
        }
    }
}
