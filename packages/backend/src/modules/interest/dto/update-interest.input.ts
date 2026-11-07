import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInterestInput extends PartialType(CreateInterestInput) {}
