import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';
import { Category } from 'src/category/entities/category.entity';
import { Interest } from 'src/interest/entities/interest.entity';
import { Tag } from 'src/tag/entities/tag.entity';

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
