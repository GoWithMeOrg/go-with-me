import { ObjectType, Field } from '@nestjs/graphql';
import { Location } from '@/modules/location/entities/location.entity';
import { Category } from '@/modules/category/entities/category.entity';
import { Interest } from '@/modules/interest/entities/interest.entity';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { User } from '@/modules/user/entities/user.entity';

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
