import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model } from 'mongoose';
import { Schema as MongoSchema } from 'mongoose';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like.name)
        private likeModel: Model<LikeDocument>
    ) {}

    async createLike(user: MongoSchema.Types.ObjectId) {
        const createLike = new this.likeModel(user);
        return await createLike.save();
    }
}
