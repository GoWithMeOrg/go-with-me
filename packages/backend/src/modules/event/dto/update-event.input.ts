import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEventInput } from './create-event.input.js';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {}
