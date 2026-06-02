import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { ToggleJoinInput } from './toggle-join.input';
import { Types } from 'mongoose';

@InputType()
export class UpdateJoinInput extends PartialType(ToggleJoinInput) {
    @Field(() => ID)
    _id: Types.ObjectId;
}
