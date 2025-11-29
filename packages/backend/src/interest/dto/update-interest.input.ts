import { CreateInterestInput } from './create-interest.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class UpdateInterestInput extends PartialType(CreateInterestInput) {
    @Field(() => ID)
    id: MongoSchema.Types.ObjectId;
}
