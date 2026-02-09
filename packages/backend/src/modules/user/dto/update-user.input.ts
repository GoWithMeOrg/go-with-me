import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => ID)
    _id: string;

    @Field(() => String, { nullable: true })
    description: string;
}
