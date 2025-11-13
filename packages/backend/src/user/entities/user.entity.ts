import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';

import { Location, LocationSchema } from '../../location/entities/location.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => String)
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  types?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Field(() => Location, { nullable: true })
  @Prop({ type: LocationSchema })
  location?: Location;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
