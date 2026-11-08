import { Event } from '@/modules/event/entities/event.entity.js';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SeedEventResult {
    @Field(() => [Event])
    events!: Event[];
}
