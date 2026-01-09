import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;
}
