import { CreateUserInput } from '@/modules/user/dto/create-user.input.js';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => ID)
    _id!: string;

    @Field(() => String, { nullable: true })
    description!: string;
}
