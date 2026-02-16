import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateRoleInput {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => [String], { nullable: 'itemsAndList' }) // Разрешаем и null, и пустой список
    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Проверяем, что каждый элемент массива — строка
    permissionIds?: string[];

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    description?: string; // Добавил знак '?', так как поле nullable
}
