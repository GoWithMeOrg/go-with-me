import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {}
