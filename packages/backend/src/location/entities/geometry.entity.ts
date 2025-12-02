import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class LocationGeometry {
    @Field(() => String)
    @Prop({ type: String, enum: ['Point'], default: 'Point' })
    type: 'Point';

    @Field(() => [Float])
    @Prop({
        type: [Number],
        required: true,
        validate: {
            validator: (v: number[]) => v.length === 2,
            message: 'Coordinates must be [lng, lat]',
        },
    })
    coordinates: [number, number];
}

export const LocationGeometrySchema = SchemaFactory.createForClass(LocationGeometry);
