import { CreateCommentInput } from '@/modules/comment/dto/create-comment.input.js';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {}
