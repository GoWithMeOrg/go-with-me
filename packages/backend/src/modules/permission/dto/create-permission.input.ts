// import { Resource } from '../enums/resource.enum.js';
import { Action } from '@/modules/permission/enums/action.enum.js';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
    @Field(() => String)
    name: string;

    @Field(() => Action)
    action: Action;

    @Field(() => String)
    resource: string;

    @Field(() => String, { nullable: true })
    description: string;
}
