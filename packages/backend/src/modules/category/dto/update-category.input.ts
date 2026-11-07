import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}
