import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { ToggleLikeInput } from '@/modules/like/dto/toggle-like.input.js';
import { Types } from 'mongoose';

@InputType()
export class UpdateLikeInput extends PartialType(ToggleLikeInput) {
    @Field(() => ID)
    _id: Types.ObjectId;
}
