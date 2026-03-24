import { Field, InputType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';
import { Privacy } from '../enum/privacy.enum';

@InputType()
export class CreateEventInput {
    @Field(() => ID, { nullable: true })
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

    @Field(() => Privacy)
    privacy: Privacy;

    @Field(() => String, { nullable: true })
    image?: string;
}
