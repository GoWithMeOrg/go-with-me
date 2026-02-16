import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    firstName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => String)
    image: string;

    @Field(() => String)
    email: string;

    @Field(() => [String], { nullable: true })
    roles?: string[];
}
