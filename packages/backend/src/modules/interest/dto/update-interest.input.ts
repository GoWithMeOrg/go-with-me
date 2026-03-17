import { InputType, PartialType } from '@nestjs/graphql';
import { CreateInterestInput } from './create-interest.input';

@InputType()
export class UpdateInterestInput extends PartialType(CreateInterestInput) {}
