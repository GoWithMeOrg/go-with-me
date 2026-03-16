import { CreateCompanionRequestInput } from './create-companion-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanionRequestInput extends PartialType(CreateCompanionRequestInput) {
  @Field(() => Int)
  id: number;
}
