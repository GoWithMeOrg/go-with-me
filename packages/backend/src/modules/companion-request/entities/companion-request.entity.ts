import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanionRequestStatus } from '../enums/companion-request.enum';
import { User } from '@/modules/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class CompanionRequest {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => User)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    sender: Types.ObjectId;

    @Field(() => User)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    receiver: Types.ObjectId;

    @Field(() => String)
    @Prop({
        type: String,
        enum: CompanionRequestStatus,
        default: CompanionRequestStatus.PENDING,
    })
    status: CompanionRequestStatus;
}

export type CompanionRequestDocument = CompanionRequest & Document;
export const CompanionRequestSchema = SchemaFactory.createForClass(CompanionRequest);
