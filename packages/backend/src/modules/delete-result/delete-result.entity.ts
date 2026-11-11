import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResult {
    @Field()
    acknowledged!: boolean;

    @Field(() => Int)
    deletedCount!: number;
}
