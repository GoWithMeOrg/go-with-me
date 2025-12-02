import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';
import { Interest } from 'src/interest/entities/interest.entity';

@ObjectType()
export class UserProfile {
    @Field(() => User)
    user: User;

    @Field(() => Location, { nullable: true })
    location?: Location;

    @Field(() => Interest, { nullable: true })
    interest?: Interest;
}
