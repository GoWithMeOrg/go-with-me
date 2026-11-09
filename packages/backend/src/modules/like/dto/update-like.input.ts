import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { ToggleLikeInput } from '@/modules/like/dto/toggle-like.input.js';

@InputType()
export class UpdateLikeInput extends PartialType(ToggleLikeInput) {
    @Field(() => ID)
    _id!: Types.ObjectId;
}
