import { ToggleJoinInput } from '@/modules/join/dto/toggle-join.input.js';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateJoinInput extends PartialType(ToggleJoinInput) {
    @Field(() => ID)
    _id: Types.ObjectId;
}
