import { ObjectType, Field } from '@nestjs/graphql';
import { Event } from '@/modules/event/entities/event.entity.js';

@ObjectType()
export class SeedEventResult {
    @Field(() => [Event])
    events: Event[];
}
