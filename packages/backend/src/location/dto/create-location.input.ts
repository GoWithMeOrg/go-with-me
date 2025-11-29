import { Field, Float, InputType, ID } from '@nestjs/graphql';

@InputType()
export class LocationPropertiesInput {
    @Field(() => String, { nullable: true })
    address?: string;
}
@InputType()
export class CreateLocationInput {
    @Field(() => [Float])
    coordinates: [number, number];

    @Field(() => LocationPropertiesInput, { nullable: true })
    properties?: LocationPropertiesInput;

    // --- ПОЛИМОРФНАЯ СВЯЗЬ ---
    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}
