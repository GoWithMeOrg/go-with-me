import { OwnerType } from '@/common/enums/owner-type.enum.js';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    content!: string;

    @Field(() => ID)
    @IsMongoId()
    ownerId!: Types.ObjectId;

    @Field(() => OwnerType)
    @IsEnum(OwnerType)
    ownerType!: OwnerType;

    @Field(() => ID, { nullable: true })
    @IsMongoId()
    @IsOptional()
    parent?: Types.ObjectId;
}
