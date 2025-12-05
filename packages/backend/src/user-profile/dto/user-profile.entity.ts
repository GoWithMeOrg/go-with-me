import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';
import { Interest } from 'src/interest/entities/interest.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@ObjectType()
export class UserProfile {
    @Field(() => User)
    user: User;

    @Field(() => Location, { nullable: true })
    location?: Location;

    @Field(() => Categories, { nullable: true })
    categories?: Categories;

    @Field(() => Interest, { nullable: true })
    interest?: Interest;

    @Field(() => Tag, { nullable: true })
    tag?: Tag;
}
