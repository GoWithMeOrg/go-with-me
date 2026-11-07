import { PrivacyVisibility } from '@/modules/privacy-setting/enums/privacy-visibility.enum.js';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

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
