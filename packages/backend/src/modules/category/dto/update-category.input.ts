import { InputType, PartialType } from '@nestjs/graphql';

import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}
