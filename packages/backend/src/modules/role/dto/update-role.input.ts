import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CreateRoleInput } from '@/modules/role/dto/create-role.input.js';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
    @Field(() => String)
    _id!: Types.ObjectId;
}
