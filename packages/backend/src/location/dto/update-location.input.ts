import { Field, Float, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { Schema as MongoSchema } from 'mongoose';

import { CreateLocationInput, LocationPropertiesInput } from './create-location.input';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId;
  @Field(() => String)
  type: string;

  @Field(() => [Float])
  coordinates: [number, number];

  @Field(() => LocationPropertiesInput, { nullable: true })
  properties?: LocationPropertiesInput;
}
