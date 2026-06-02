import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
    timestamps: true,
})
export class Resource {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true, uppercase: true })
    slug: string;

    @Field(() => String)
    @Prop({ required: true })
    name: string;
}

export type ResourceDocument = Resource & Document;
export const ResourceSchema = SchemaFactory.createForClass(Resource);
