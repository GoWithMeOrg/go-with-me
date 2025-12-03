import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class UpdateCategoriesInput {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => [String])
    categories: string[];
}
