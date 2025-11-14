import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ _id: false })
export class LocationProperties {
    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    address?: string;
}

export const LocationPropertiesSchema = SchemaFactory.createForClass(LocationProperties);

@ObjectType()
@Schema()
export class Location {
    @Field(() => String)
    _id: MongooSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['Point'], required: true })
    type: string;

    @Field(() => [Float])
    @Prop({ type: [Number], required: true })
    coordinates: [number, number];

    @Field(() => LocationProperties, { nullable: true })
    @Prop({ type: LocationPropertiesSchema })
    properties?: LocationProperties;
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
