import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CreatePermissionInput } from './create-permission.input.js';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
    @Field(() => String)
    _id: Types.ObjectId;
}
