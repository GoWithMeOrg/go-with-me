import { InputType, Field } from '@nestjs/graphql';
import { Resource } from '../enums/resource.enum';
import { Action } from '../enums/action.enum';

@InputType()
export class CreatePermissionInput {
    @Field(() => String)
    name: string;

    @Field(() => [Action])
    action: Action[];

    @Field(() => Resource)
    resource: Resource;

    @Field(() => String)
    description: string;
}
