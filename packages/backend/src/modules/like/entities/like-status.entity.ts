import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class LikeStatus {
    @Field(() => ID)
    ownerId: Types.ObjectId;

    @Field(() => Int)
    count: number;

    @Field(() => Boolean)
    isLiked: boolean;
}
