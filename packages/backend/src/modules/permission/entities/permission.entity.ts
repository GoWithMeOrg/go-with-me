import { Action } from '@/modules/permission/enums/action.enum.js';
import { Resource } from '@/modules/resource/entities/resource.entity.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Permission {
    @Field(() => ID)
    _id!: Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true })
    name!: string;

    @Field(() => Action)
    @Prop({ type: String, enum: Action, required: true })
    action!: Action;

    @Field(() => Resource)
    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Resource', required: true })
    resource!: Types.ObjectId;

    @Field(() => String, { nullable: true })
    @Prop({ default: '' })
    description!: string;

    @Field(() => Boolean)
    @Prop({ type: Boolean, default: true })
    isActive!: boolean;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
