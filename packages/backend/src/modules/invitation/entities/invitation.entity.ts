import { Event } from '@/modules/event/entities/event.entity.js';
import { InvitationResponseStatus } from '@/modules/invitation/enums/invitation-response.enum.js';
import { User } from '@/modules/user/entities/user.entity.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Invitation {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => Event)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'Event' })
    event: Types.ObjectId;

    @Field(() => User)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    sender: Types.ObjectId;

    @Field(() => User)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    receiver: Types.ObjectId;

    @Field(() => String)
    @Prop({
        type: String,
        enum: InvitationResponseStatus,
        default: InvitationResponseStatus.INVITED,
    })
    status: InvitationResponseStatus;

    @Field(() => Date, { nullable: true })
    @Prop({ type: Date, default: null })
    respondedAt?: Date;
}

export type InvitationDocument = Invitation & Document;
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
