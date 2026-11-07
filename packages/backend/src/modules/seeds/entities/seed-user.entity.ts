import { ObjectType, Field } from '@nestjs/graphql';
import { Location } from '@/modules/location/entities/location.entity.js';
import { Category } from '@/modules/category/entities/category.entity.js';
import { Interest } from '@/modules/interest/entities/interest.entity.js';
import { Tag } from '@/modules/tag/entities/tag.entity.js';
import { User } from '@/modules/user/entities/user.entity.js';

@ObjectType()
export class SeedUserResult {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => Location, { nullable: true })
    location?: Location;

    @Field(() => Category, { nullable: true })
    category?: Category;

    @Field(() => Interest, { nullable: true })
    interest?: Interest;

    @Field(() => Tag, { nullable: true })
    tag?: Tag;
}
