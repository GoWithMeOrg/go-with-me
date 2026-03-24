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

    async toggleLike(
        user: MongoSchema.Types.ObjectId,
        ownerId: MongoSchema.Types.ObjectId,
        ownerType: 'Event' | 'Comment' | 'Trip'
    ): Promise<boolean> {
        const existingLike = await this.likeModel.findOne({ user, ownerId });

        if (existingLike) {
            await this.likeModel.deleteOne({ user, ownerId });
            return false;
        } else {
            const like = new this.likeModel({ user, ownerId, ownerType });
            await like.save();
            return true;
        }
    }

    async getLikeByOwnerId(ownerId: MongoSchema.Types.ObjectId) {
        return this.likeModel.find({ ownerId }).exec();
    }

    async isLikedByUser(
        owner_id: MongoSchema.Types.ObjectId,
        user_id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const like = await this.likeModel.findOne({ ownerId: owner_id, user: user_id }).exec();
        return !!like;
    }

    // async deleteLike(like_id: MongoSchema.Types.ObjectId) {
    //     return this.likeModel.findByIdAndDelete(like_id).exec();
    // }
}
