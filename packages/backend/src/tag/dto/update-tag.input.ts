import { InputType, Field } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class UpdateTagInput {
    @Field(() => String, { nullable: true })
    _id: MongoSchema.Types.ObjectId;

    @Field(() => [String], { nullable: true })
    tags: string[];
}
