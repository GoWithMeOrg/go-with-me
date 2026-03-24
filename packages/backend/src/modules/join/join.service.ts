import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Join, JoinDocument } from './entities/join.entity';
import { Model, Schema as MongoSchema } from 'mongoose';

@Injectable()
export class JoinService {
    constructor(
        @InjectModel(Join.name)
        private joinModel: Model<JoinDocument>
    ) {}

    async toggleJoin(
        user: MongoSchema.Types.ObjectId,
        ownerId: MongoSchema.Types.ObjectId,
        ownerType: 'Event' | 'Trip'
    ): Promise<boolean> {
        const existingJoin = await this.joinModel.findOne({ user, ownerId });

        if (existingJoin) {
            await this.joinModel.deleteOne({ user, ownerId });
            return false;
        } else {
            const join = new this.joinModel({ user, ownerId, ownerType });
            await join.save();
            return true;
        }
    }

    async getJoinedUsersByOwnerId(ownerId: MongoSchema.Types.ObjectId) {
        return this.joinModel.find({ ownerId }).exec();
    }

    async isJoinedByUser(
        owner_id: MongoSchema.Types.ObjectId,
        user_id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const join = await this.joinModel.findOne({ ownerId: owner_id, user: user_id }).exec();
        return !!join;
    }
}
