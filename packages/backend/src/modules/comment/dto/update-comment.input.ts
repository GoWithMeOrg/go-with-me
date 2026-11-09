import { InputType, PartialType } from '@nestjs/graphql';

import { CreateCommentInput } from '@/modules/comment/dto/create-comment.input.js';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {}
