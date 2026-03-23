import { InputType, Field } from '@nestjs/graphql';
import { CreateCategoryInput } from '../../category/dto/create-category.input';
import { CreateInterestInput } from '../../interest/dto/create-interest.input';
import { CreateLocationInput } from '../../location/dto/create-location.input';
import { CreateTagInput } from '../../tag/dto/create-tag.input';

@InputType()
export class EventRelationsInput {
    @Field(() => CreateLocationInput, { nullable: true })
    location?: CreateLocationInput;

    @Field(() => CreateCategoryInput, { nullable: true })
    category?: CreateCategoryInput;

    @Field(() => CreateInterestInput, { nullable: true })
    interest?: CreateInterestInput;

    @Field(() => CreateTagInput, { nullable: true })
    tag?: CreateTagInput;
}
