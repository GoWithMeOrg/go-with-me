import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
    @Field(() => String)
    role: string;

    @Field(() => String, { nullable: true })
    description: string;
}
