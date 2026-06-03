import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LocationGeometry, LocationGeometrySchema } from './geometry.entity';
import { LocationProperties, LocationPropertiesSchema } from './properties.entity';

@ObjectType()
@Schema()
export class Location {
    @Field(() => String)
    _id: Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, enum: ['Feature'], default: 'Feature' })
    type: string;

    @Field(() => LocationGeometry)
    @Prop({ type: LocationGeometrySchema, _id: false, required: true })
    geometry: LocationGeometry;

    @Field(() => LocationProperties)
    @Prop({ type: LocationPropertiesSchema, _id: false, required: true })
    properties: LocationProperties;
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
