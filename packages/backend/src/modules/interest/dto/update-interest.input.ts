import { InputType, PartialType } from '@nestjs/graphql';

import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';

@InputType()
export class UpdateInterestInput extends PartialType(CreateInterestInput) {}
