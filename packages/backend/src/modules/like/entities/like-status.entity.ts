import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class LikeStatus {
    @Field(() => ID)
    ownerId: string;

    @Field(() => Int)
    count: number;

    @Field(() => Boolean)
    isLiked: boolean;
}
