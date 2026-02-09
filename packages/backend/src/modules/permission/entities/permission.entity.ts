import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Action } from '../enums/action.enum';
import { Resource } from 'src/modules/resource/entities/resource.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Permission {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true })
    name: string;

    @Field(() => Action)
    @Prop({ type: String, enum: Action, required: true })
    action: Action;

    @Field(() => Resource)
    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Resource', required: true })
    resource: Resource;

    @Field(() => String, { nullable: true })
    @Prop({ default: '' })
    description: string;

    @Field(() => Boolean)
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
