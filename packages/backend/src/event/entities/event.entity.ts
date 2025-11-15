import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../../location/entities/location.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Event {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description?: string;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  time?: string;

  @Field(() => Location, { nullable: true })
  @Prop({ type: LocationSchema })
  location?: Location;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image?: string;

  @Field(() => User)
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  organizer: MongoSchema.Types.ObjectId | User;

  @Field(() => Date)
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Field(() => Date)
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
