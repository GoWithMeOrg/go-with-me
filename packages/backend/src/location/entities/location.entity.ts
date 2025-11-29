import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

@ObjectType()
export class LocationGeometry {
    @Field(() => String)
    type: 'Point';

    @Field(() => [Float])
    coordinates: [number, number];
}

@ObjectType()
@Schema({ timestamps: true })
export class LocationProperties {
    @Field(() => String)
    @Prop({ type: String })
    address: string;

    @Field(() => String)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: string;

    @Field(() => String)
    @Prop({ type: String, enum: ['User', 'Event'], required: true })
    ownerType: 'User' | 'Event';

    @Field(() => Date)
    @Prop({ required: true })
    createdAt: Date;

    @Field(() => Date)
    @Prop({ required: true })
    updatedAt: Date;
}

@ObjectType()
@Schema()
export class Location {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, enum: ['Feature'], default: 'Feature' })
    type: string;

    // ---- GEOMETRY ----
    @Field(() => LocationGeometry)
    @Prop(
        raw({
            type: { type: String, enum: ['Point'], required: true },
            coordinates: {
                type: [Number],
                required: true,
                validate: {
                    validator: (v: number[]) => v.length === 2,
                },
            },
        })
    )
    geometry: LocationGeometry;

    // ---- PROPERTIES ----
    @Field(() => LocationProperties)
    @Prop(
        raw({
            address: { type: String },
            ownerId: { type: MongoSchema.Types.ObjectId, required: true },
            ownerType: { type: String, enum: ['User', 'Event'], required: true },
            createdAt: { type: Date, required: true },
            updatedAt: { type: Date, required: true },
        })
    )
    properties: LocationProperties;
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
