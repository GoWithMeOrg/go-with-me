import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Permission } from '../../permission/entities/permission.entity'; // импорт сущности прав

@ObjectType()
@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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

    // Описываем виртуальное поле для GraphQL
    @Field(() => [Permission], { nullable: true })
    permissions?: Permission[];
}

export type ResourceDocument = Resource & Document;
export const ResourceSchema = SchemaFactory.createForClass(Resource);

// Виртуальное поле объявляем ПОСЛЕ создания ResourceSchema
ResourceSchema.virtual('permissions', {
    ref: 'Permission',
    localField: '_id',
    foreignField: 'resource',
});
