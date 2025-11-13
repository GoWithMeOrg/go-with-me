import { Field, InputType } from '@nestjs/graphql';

import { CreateLocationInput } from '../../location/dto/create-location.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  types?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => Boolean, { nullable: true })
  emailVerified?: boolean;

  @Field(() => CreateLocationInput, { nullable: true })
  location?: CreateLocationInput;
}
