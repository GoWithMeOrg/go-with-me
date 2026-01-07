import { CreateRoleInput } from './create-role.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;
}
