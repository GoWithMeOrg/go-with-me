import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location } from '../../location/entities/location.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Interest } from 'src/modules/interest/entities/interest.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Privacy } from '../enum/privacy.enum';
import { Like } from 'src/modules/like/entities/like.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Event {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
    organizer: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, required: true })
    name: string;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    description?: string;

    @Field(() => Date)
    @Prop({ type: Date, required: true })
    startDate: Date;

    @Field(() => Date, { nullable: true })
    @Prop({ type: Date })
    endDate: Date;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    time?: string;

    @Field(() => Privacy)
    @Prop({ type: String, enum: Privacy, required: true })
    privacy: Privacy;

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
