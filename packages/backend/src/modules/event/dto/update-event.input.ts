import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {}
