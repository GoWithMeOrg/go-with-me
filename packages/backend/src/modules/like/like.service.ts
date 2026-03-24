import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model, Schema as MongoSchema } from 'mongoose';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like.name)
        private likeModel: Model<LikeDocument>
    ) {}

    async createLike(
        user: MongoSchema.Types.ObjectId,
        ownerId: MongoSchema.Types.ObjectId,
        ownerType: 'Event' | 'Comment' | 'Trip'
    ) {
        const like = new this.likeModel({ user, ownerId, ownerType });
        return await like.save();
    }

    async findByOwnerId(ownerId: MongoSchema.Types.ObjectId) {
        return this.likeModel.find({ ownerId }).exec();
    }

    async deleteLike(like_id: MongoSchema.Types.ObjectId) {
        return this.likeModel.findByIdAndDelete(like_id).exec();
    }
}
