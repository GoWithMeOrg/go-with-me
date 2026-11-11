import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Privacy } from '@/modules/event/enum/privacy.enum.js';

@InputType()
export class CreateEventInput {
    @Field(() => ID, { nullable: true })
    organizer!: Types.ObjectId;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Date)
    startDate!: Date;

    @Field(() => Date)
    endDate!: Date;

    @Field(() => String, { nullable: true })
    time?: string;

    @Field(() => Privacy)
    privacy!: Privacy;

    @Field(() => String, { nullable: true })
    image?: string;
}
