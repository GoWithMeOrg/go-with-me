import { Field, InputType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';
import { CreateLocationInput } from '../../location/dto/create-location.input';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => String, { nullable: true })
  time?: string;

  @Field(() => CreateLocationInput, { nullable: true })
  location?: CreateLocationInput;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => ID)
  organizer: MongoSchema.Types.ObjectId;
}
