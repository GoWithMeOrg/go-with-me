import { InputType, Field } from '@nestjs/graphql';
import { CreateCategoryInput } from 'src/modules/category/dto/create-category.input';
import { CreateInterestInput } from 'src/modules/interest/dto/create-interest.input';
import { CreateLocationInput } from 'src/modules/location/dto/create-location.input';
import { CreateTagInput } from 'src/modules/tag/dto/create-tag.input';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';

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
