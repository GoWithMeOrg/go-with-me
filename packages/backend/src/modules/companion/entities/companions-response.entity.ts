import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '@/modules/user/entities/user.entity';

@ObjectType()
export class CompanionsResponse {
    @Field(() => [User])
    companions: User[];

    @Field(() => Int)
    totalCompanions: number;
}
