import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like.name)
        private likeModel: Model<LikeDocument>
    ) {}

    async toggleLike(
        user: Types.ObjectId,
        ownerId: Types.ObjectId,
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

    async getLikesByOwnerId(ownerId: Types.ObjectId) {
        return this.likeModel.find({ ownerId }).exec();
    }

    async getLikesCount(ownerId: Types.ObjectId): Promise<number> {
        return this.likeModel.countDocuments({ ownerId }).exec();
    }

    async isLikedByUser(
        owner_id: Types.ObjectId,
        user_id: Types.ObjectId
    ): Promise<boolean> {
        const like = await this.likeModel.findOne({ ownerId: owner_id, user: user_id }).exec();
        return !!like;
    }

    async getLikesBatch(
        ownerIds: Types.ObjectId[],
        user_id: Types.ObjectId
    ): Promise<{ ownerId: string; count: number; isLiked: boolean }[]> {
        const [counts, userLikes] = await Promise.all([
            this.likeModel.aggregate([
                { $match: { ownerId: { $in: ownerIds } } },
                { $group: { _id: '$ownerId', count: { $sum: 1 } } },
            ]),
            this.likeModel.find({ ownerId: { $in: ownerIds }, user: user_id }).select('ownerId'),
        ]);

        const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));
        const likedSet = new Set(userLikes.map((l) => l.ownerId.toString()));

        return ownerIds.map((id) => {
            const key = id.toString();
            return { ownerId: key, count: countMap.get(key) ?? 0, isLiked: likedSet.has(key) };
        });
    }

    // async deleteLike(like_id: Types.ObjectId) {
    //     return this.likeModel.findByIdAndDelete(like_id).exec();
    // }
}
