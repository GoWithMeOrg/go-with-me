import { InputType, PartialType } from '@nestjs/graphql';

import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {}
