import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
    @Field(() => String)
    role: string;

    @Field(() => [String], { nullable: true })
    permissionIds?: string[];

    @Field(() => String, { nullable: true })
    description: string;
}
