import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongoSchema, Types } from 'mongoose';
import { IsString, IsNotEmpty, IsMongoId, IsEnum, IsOptional } from 'class-validator';
import { OwnerType } from '@/common/enums/owner-type.enum';

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    content: string;

    @Field(() => ID)
    @IsMongoId()
    ownerId: Types.ObjectId;

    @Field(() => OwnerType)
    @IsEnum(OwnerType)
    ownerType: OwnerType;

    @Field(() => ID, { nullable: true })
    @IsMongoId()
    @IsOptional()
    parent?: Types.ObjectId;
}
