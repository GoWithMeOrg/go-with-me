import { Field, ID, InputType } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';
import { LocationGeometryInput } from './create-location.input';

@InputType()
export class UpdateLocationPropertiesInput {
    @Field(() => String, { nullable: true })
    address?: string;
}

@InputType()
export class UpdateLocationInput {
    @Field(() => ID, { nullable: true })
    _id: MongoSchema.Types.ObjectId;

    @Field(() => LocationGeometryInput, { nullable: true })
    geometry?: LocationGeometryInput;

    @Field(() => UpdateLocationPropertiesInput, { nullable: true })
    properties?: UpdateLocationPropertiesInput;
}
