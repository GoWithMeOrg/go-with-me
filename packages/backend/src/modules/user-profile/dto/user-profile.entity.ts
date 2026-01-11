import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/modules/user/entities/user.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Interest } from 'src/modules/interest/entities/interest.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';

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
