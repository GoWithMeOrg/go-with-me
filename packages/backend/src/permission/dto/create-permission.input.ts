import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
    @Field(() => String)
    permission: string;

    @Field(() => String)
    action: string; // read, write, delete, execute

    @Field(() => String)
    resource: string;

    @Field(() => String)
    description: string;
}
