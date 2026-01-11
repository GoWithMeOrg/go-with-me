import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Action } from '../enums/action.enum';
import { Resource } from '../enums/resource.enum';

@ObjectType()
@Schema({ timestamps: true })
export class Permission {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true })
    name: string;

    @Field(() => [Action])
    @Prop({ type: [String], enum: Action, required: true })
    action: Action[];

    @Field(() => Resource)
    @Prop({ type: String, enum: Resource, required: true })
    resource: Resource;

    @Field(() => String)
    @Prop({ default: '' })
    description: string;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
