import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

@ObjectType()
@Schema()
export class LocationProperties {
    @Field(() => String, { nullable: true })
    @Prop()
    address?: string;

    @Field(() => String)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: string;

    @Field(() => String)
    @Prop({ type: String, enum: ['User', 'Event'], required: true })
    ownerType: 'User' | 'Event';

    @Field(() => Date)
    @Prop({ default: Date.now })
    createdAt: Date;

    @Field(() => Date)
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const LocationPropertiesSchema = SchemaFactory.createForClass(LocationProperties);
