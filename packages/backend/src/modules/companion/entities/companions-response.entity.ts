import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from '@/modules/user/entities/user.entity.js';

@ObjectType()
export class CompanionsResponse {
    @Field(() => [User])
    companions!: User[];

    @Field(() => Int)
    totalCompanions!: number;
}
