import { InputType, Field } from '@nestjs/graphql';

import { PrivacyVisibility } from '../enums/privacy-visibility.enum';

@InputType()
export class UpdatePrivacySettingInput {
    @Field(() => PrivacyVisibility, { nullable: true })
    whoCanSeeEvents?: PrivacyVisibility;

    @Field(() => PrivacyVisibility, { nullable: true })
    whoCanInviteToEvents?: PrivacyVisibility;
}
