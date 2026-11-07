import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {}
