import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@/modules/user/entities/user.entity';

@Injectable()
export class SessionSerializer {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    serializeUser(user: Partial<User>, done: Function) {
        // сохраняем только ID в сессии (toString() для консистентности)
        done(null, user._id?.toString());
    }

    async deserializeUser(id: string, done: Function) {
        try {
            const user = await this.userModel.findById(id);

            if (!user) {
                done(null, null);
                return;
            }

            // Не передаём роли в сессии для минимизации утечки данных
            // Приводим _id к строке для консистентности с serializeUser
            const userSession = {
                _id: String(user._id),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            done(null, userSession);
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error deserializing user:', err.message);
            } else {
                console.error('Unknown error in deserializeUser');
            }
            done(err, null);
        }
    }
}
