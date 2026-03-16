import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanionRequestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
