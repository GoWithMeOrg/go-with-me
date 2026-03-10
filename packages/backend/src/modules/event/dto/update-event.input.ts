import { Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { CreateEventInput } from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
    @Field(() => ID)
    _id: string;
}
