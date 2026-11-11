import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateCompanionRequestInput } from '@/modules/companion-request/dto/create-companion-request.input.js';

@InputType()
export class UpdateCompanionRequestInput extends PartialType(CreateCompanionRequestInput) {
    @Field(() => Int)
    id!: number;
}
