import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { ToggleJoinInput } from './toggle-join.input';

@InputType()
export class UpdateJoinInput extends PartialType(ToggleJoinInput) {
    @Field(() => ID)
    _id: string;
}
