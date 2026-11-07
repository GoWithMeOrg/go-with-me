import { InputType, Field } from '@nestjs/graphql';
import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { CreateUserInput } from '@/modules/user/dto/create-user.input.js';

@InputType()
export class SeedUserInput {
    @Field(() => CreateUserInput, { nullable: true })
    user?: CreateUserInput;

    @Field(() => CreateLocationInput, { nullable: true })
    location?: CreateLocationInput;

    @Field(() => CreateCategoryInput, { nullable: true })
    category?: CreateCategoryInput;

    @Field(() => CreateInterestInput, { nullable: true })
    interest?: CreateInterestInput;

    @Field(() => CreateTagInput, { nullable: true })
    tag?: CreateTagInput;
}
