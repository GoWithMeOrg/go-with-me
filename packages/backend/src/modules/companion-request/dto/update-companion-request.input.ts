import { CreateCompanionRequestInput } from '@/modules/companion-request/dto/create-companion-request.input.js';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanionRequestInput extends PartialType(CreateCompanionRequestInput) {
    @Field(() => Int)
    id!: number;
}
