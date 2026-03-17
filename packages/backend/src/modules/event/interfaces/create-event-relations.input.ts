import { CreateCategoryInput } from '../../category/dto/create-category.input';
import { CreateInterestInput } from '../../interest/dto/create-interest.input';
import { CreateLocationInput } from '../../location/dto/create-location.input';
import { CreateTagInput } from '../../tag/dto/create-tag.input';

export interface EventRelationsInput {
    location?: CreateLocationInput;
    category?: CreateCategoryInput;
    interest?: CreateInterestInput;
    tag?: CreateTagInput;
}
