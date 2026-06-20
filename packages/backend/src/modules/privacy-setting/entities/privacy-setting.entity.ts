import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { PrivacyVisibility } from '../enums/privacy-visibility.enum';

@ObjectType()
@Schema({ timestamps: true })
export class PrivacySetting {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: 'User' })
    ownerId: Types.ObjectId;

    @Field(() => PrivacyVisibility)
    @Prop({ type: String, enum: PrivacyVisibility, default: PrivacyVisibility.EVERYONE })
    whoCanSeeEvents: PrivacyVisibility;

    @Field(() => PrivacyVisibility)
    @Prop({ type: String, enum: PrivacyVisibility, default: PrivacyVisibility.EVERYONE })
    whoCanInviteToEvents: PrivacyVisibility;

    @Field(() => [ID])
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    markedForWhoCanSeeEvents: Types.ObjectId[];

    @Field(() => [ID])
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    markedForWhoCanInviteToEvents: Types.ObjectId[];
}

export type PrivacySettingDocument = PrivacySetting & Document;
export const PrivacySettingSchema = SchemaFactory.createForClass(PrivacySetting);
