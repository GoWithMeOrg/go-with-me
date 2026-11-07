import { User } from '@/modules/user/entities/user.entity.js';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanionsResponse {
    @Field(() => [User])
    companions: User[];

    @Field(() => Int)
    totalCompanions: number;
}
