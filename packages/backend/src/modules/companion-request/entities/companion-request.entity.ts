import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanionRequestStatus } from '../enums/companion-request.enum';

@ObjectType()
@Schema({ timestamps: true })
export class CompanionRequest {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    sender_id: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    receiver_id: MongoSchema.Types.ObjectId;

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
