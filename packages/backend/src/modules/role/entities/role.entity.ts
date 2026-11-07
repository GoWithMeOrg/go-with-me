import { Permission } from '@/modules/permission/entities/permission.entity.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Role {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true })
    name: string;

    @Field(() => [Permission])
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Permission' }] })
    permissions: Permission[];

    @Field(() => String, { nullable: true })
    @Prop({ default: '' })
    description: string;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
