import { Field, InputType } from '@nestjs/graphql';
import { CreateLocationInput } from '../../location/dto/create-location.input';

@InputType()
export class UpdateEventInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => String, { nullable: true })
  time?: string;

  @Field(() => CreateLocationInput, { nullable: true })
  location?: CreateLocationInput;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
