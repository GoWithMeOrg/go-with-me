import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/graphql';
import { CreateLikeInput } from './create-like.input';

@InputType()
export class UpdateLikeInput extends PartialType(CreateLikeInput) {
    @Field(() => ID)
    _id: string;
}
