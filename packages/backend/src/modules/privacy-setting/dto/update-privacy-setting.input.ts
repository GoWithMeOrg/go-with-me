import { InputType, Field, ID } from '@nestjs/graphql';

import { Types } from 'mongoose';

import { PrivacyVisibility } from '../enums/privacy-visibility.enum';

@InputType()
export class UpdatePrivacySettingInput {
    @Field(() => PrivacyVisibility, { nullable: true })
    whoCanSeeEvents?: PrivacyVisibility;

    @Field(() => PrivacyVisibility, { nullable: true })
    whoCanInviteToEvents?: PrivacyVisibility;

    @Field(() => [ID], { nullable: true })
    markedForWhoCanSeeEvents?: Types.ObjectId[];

    @Field(() => [ID], { nullable: true })
    markedForWhoCanInviteToEvents?: Types.ObjectId[];
}
