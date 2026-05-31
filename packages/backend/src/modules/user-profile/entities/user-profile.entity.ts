import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@/modules/user/entities/user.entity';
import { Location } from '@/modules/location/entities/location.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { Interest } from '@/modules/interest/entities/interest.entity';
import { Tag } from '@/modules/tag/entities/tag.entity';

@ObjectType()
export class UserProfile {
    @Field(() => User)
    user: User;

    @Field(() => Location, { nullable: true })
    location?: Location;

    @Field(() => Category, { nullable: true })
    category?: Category;

    @Field(() => Interest, { nullable: true })
    interest?: Interest;

    @Field(() => Tag, { nullable: true })
    tag?: Tag;
}
