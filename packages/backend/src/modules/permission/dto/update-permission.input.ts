import { CreatePermissionInput } from '@/modules/permission/dto/create-permission.input.js';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
    @Field(() => String)
    _id: Types.ObjectId;
}
