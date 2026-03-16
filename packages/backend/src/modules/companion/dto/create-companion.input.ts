import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
