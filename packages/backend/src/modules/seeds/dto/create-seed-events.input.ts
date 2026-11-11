import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';
import { EventRelationsInput } from '@/modules/event/interfaces/create-event-relations.input.js';

@InputType()
export class SeedEventsInput {
    @Field(() => CreateEventInput)
    event!: CreateEventInput;

    @Field(() => EventRelationsInput, { nullable: true })
    relations?: EventRelationsInput;

    @Field(() => ID)
    organizer!: Types.ObjectId;
}
