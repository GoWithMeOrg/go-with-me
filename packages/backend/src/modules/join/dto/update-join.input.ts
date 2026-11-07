import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { ToggleJoinInput } from '@/modules/join/dto/toggle-join.input.js';
import { Types } from 'mongoose';

@InputType()
export class UpdateJoinInput extends PartialType(ToggleJoinInput) {
    @Field(() => ID)
    _id: Types.ObjectId;
}
