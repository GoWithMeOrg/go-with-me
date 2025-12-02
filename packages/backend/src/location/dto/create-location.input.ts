import { Field, Float, InputType, ID } from '@nestjs/graphql';

@InputType()
export class LocationGeometryInput {
    @Field(() => [Float])
    coordinates: [number, number];
}

@InputType()
export class LocationPropertiesInput {
    @Field(() => String, { nullable: true })
    address?: string;

    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}

@InputType()
export class CreateLocationInput {
    @Field(() => LocationGeometryInput)
    geometry: LocationGeometryInput;

    @Field(() => LocationPropertiesInput)
    properties: LocationPropertiesInput;
}
