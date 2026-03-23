import { ObjectType, Field } from '@nestjs/graphql';
import { Event } from 'src/modules/event/entities/event.entity';

@ObjectType()
export class SeedEventResult {
    @Field(() => [Event])
    events: Event[];
}
