import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { Schema as MongoSchema } from 'mongoose';

import { CreateLocationInput, LocationPropertiesInput } from './create-location.input';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => [Float], { nullable: true })
    coordinates: [number, number];

    @Field(() => LocationPropertiesInput, { nullable: true })
    properties: LocationPropertiesInput;
}
