import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { ToggleJoinInput } from '@/modules/join/dto/toggle-join.input.js';

@InputType()
export class UpdateJoinInput extends PartialType(ToggleJoinInput) {
    @Field(() => ID)
    _id!: Types.ObjectId;
}
