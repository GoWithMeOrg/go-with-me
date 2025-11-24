import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
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
@Schema({ timestamps: true })
export class Location {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['Point'], required: true })
    type: string;

    @Field(() => [Float])
    @Prop({ type: [Number], required: true })
    coordinates: [number, number];

    @Field(() => LocationProperties, { nullable: true })
    @Prop({ type: LocationPropertiesSchema })
    properties?: LocationProperties;

    // ПОЛИМОРФНАЯ СВЯЗЬ
    @Field(() => String)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: string; // сюда пишем userId или eventId

    @Field(() => String)
    @Prop({ type: String, enum: ['User', 'Event'], required: true })
    ownerType: 'User' | 'Event'; // тип владельца

    @Field(() => Date)
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Field(() => Date)
    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
