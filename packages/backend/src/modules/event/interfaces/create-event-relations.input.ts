import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { Field, InputType } from '@nestjs/graphql';

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
