import { InputType, Field } from '@nestjs/graphql';
// import { Resource } from '../enums/resource.enum';
import { Action } from '../enums/action.enum';
import { Resource } from 'src/modules/resource/entities/resource.entity';

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
