import { CreateCompanionInput } from './create-companion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanionInput extends PartialType(CreateCompanionInput) {
  @Field(() => Int)
  id: number;
}
