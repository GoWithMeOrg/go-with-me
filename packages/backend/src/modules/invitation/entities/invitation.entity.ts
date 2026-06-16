import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@/modules/user/entities/user.entity';
import { Event } from '@/modules/event/entities/event.entity';

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
}

export type InvitationDocument = Invitation & Document;
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
