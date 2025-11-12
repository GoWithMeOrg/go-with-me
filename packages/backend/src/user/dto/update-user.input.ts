import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { Schema as MongooSchema } from 'mongoose';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  password: string;
}
