import { CreateRoleInput } from '@/modules/role/dto/create-role.input.js';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
    @Field(() => String)
    _id!: Types.ObjectId;
}
