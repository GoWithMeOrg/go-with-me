import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@/modules/user/entities/user.entity';
import { Invitation } from './invitation.entity';
import { InvitationResponseStatus } from '../enums/invitation-response.enum';

@ObjectType()
@Schema({ timestamps: true })
export class Invited {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => Invitation, { nullable: true })
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'Invitation' })
    invitation: Types.ObjectId;

    @Field(() => User)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true, ref: 'User' })
    user: Types.ObjectId;

    @Field(() => String)
    @Prop({
        type: String,
        enum: InvitationResponseStatus,
        default: InvitationResponseStatus.INVITED,
    })
    status: InvitationResponseStatus;

    @Field(() => Date, { nullable: true })
    @Prop({ type: Date, default: null })
    respondedAt: Date;
}

export type InvitedDocument = Invited & Document;
export const InvitedSchema = SchemaFactory.createForClass(Invited);
