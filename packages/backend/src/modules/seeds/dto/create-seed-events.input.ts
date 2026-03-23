import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CreateEventInput } from 'src/modules/event/dto/create-event.input';
import { EventRelationsInput } from 'src/modules/event/interfaces/create-event-relations.input';

@InputType()
export class SeedEventsInput {
    @Field(() => CreateEventInput)
    event: CreateEventInput;

    @Field(() => EventRelationsInput, { nullable: true })
    relations?: EventRelationsInput;

    @Field(() => ID)
    organizer: MongoSchema.Types.ObjectId;
}
