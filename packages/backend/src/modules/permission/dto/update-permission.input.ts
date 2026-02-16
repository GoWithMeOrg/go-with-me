import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CreatePermissionInput } from './create-permission.input';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;
}
