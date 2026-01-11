import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from 'src/modules/role/entities/role.entity';
@ObjectType()
@Schema({ timestamps: true })
export class User {
    @Field(() => String)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String })
    firstName: string;

    @Field(() => String)
    @Prop({ type: String })
    lastName: string;

    @Field(() => String)
    @Prop({ type: String, unique: true })
    email: string;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    image: string;

    @Field(() => String, { nullable: true })
    @Prop({ type: String })
    description: string;

    @Field(() => [Role], { nullable: true })
    @Prop({ type: [{ type: 'ObjectId', ref: 'Role' }] })
    roles: Role[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
