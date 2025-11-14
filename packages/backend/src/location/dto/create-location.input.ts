import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LocationPropertiesInput {
    @Field(() => String, { nullable: true })
    address?: string;
}

@InputType()
export class CreateLocationInput {
    @Field(() => String)
    type: string;

    @Field(() => [Float])
    coordinates: [number, number];

    @Field(() => LocationPropertiesInput, { nullable: true })
    properties?: LocationPropertiesInput;
}
