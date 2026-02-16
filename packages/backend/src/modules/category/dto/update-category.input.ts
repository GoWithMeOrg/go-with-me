import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class UpdateCategoryInput {
    @Field(() => String, { nullable: true })
    _id: MongoSchema.Types.ObjectId;

    @Field(() => [String], { nullable: true })
    categories: string[];
}
