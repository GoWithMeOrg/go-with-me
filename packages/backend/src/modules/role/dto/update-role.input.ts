import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;
}
