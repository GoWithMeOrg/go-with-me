import { Field, InputType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class CreateEventInput {
    @Field(() => ID)
    organizer: MongoSchema.Types.ObjectId;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Date)
    startDate: Date;

    @Field(() => Date)
    endDate: Date;

    @Field(() => String, { nullable: true })
    time?: string;

    @Field(() => String, { nullable: true })
    image?: string;
}
