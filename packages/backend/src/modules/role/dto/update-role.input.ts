import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
    @Field(() => String)
    _id: Types.ObjectId;
}
