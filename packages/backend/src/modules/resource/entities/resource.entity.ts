import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Permission } from 'src/modules/permission/entities/permission.entity';

@ObjectType()
@Schema({
    timestamps: true,
})
export class Resource {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true, uppercase: true })
    slug: string;

    @Field(() => String)
    @Prop({ required: true })
    name: string;
}

export type ResourceDocument = Resource & Document;
export const ResourceSchema = SchemaFactory.createForClass(Resource);
