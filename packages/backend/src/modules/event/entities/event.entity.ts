import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Category } from '@/modules/category/entities/category.entity.js';
import { Privacy } from '@/modules/event/enum/privacy.enum.js';
import { Interest } from '@/modules/interest/entities/interest.entity.js';
import { Location } from '@/modules/location/entities/location.entity.js';
import { Tag } from '@/modules/tag/entities/tag.entity.js';

@ObjectType()
@Schema({ timestamps: true })
export class Event {
    @Field(() => ID)
    _id!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    organizer!: Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, required: true })
    name!: string;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    description?: string;

    @Field(() => Date)
    @Prop({ type: Date, required: true })
    startDate!: Date;

    @Field(() => Date, { nullable: true })
    @Prop({ type: Date })
    endDate!: Date;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    time?: string;

    @Field(() => Privacy)
    @Prop({ type: String, enum: Privacy, required: true })
    privacy!: Privacy;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    image?: string;

    @Field(() => Location, { nullable: true })
    location?: Location;

    @Field(() => Category, { nullable: true })
    category?: Category;

    @Field(() => Interest, { nullable: true })
    interest?: Interest;

    @Field(() => Tag, { nullable: true })
    tag?: Tag;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
