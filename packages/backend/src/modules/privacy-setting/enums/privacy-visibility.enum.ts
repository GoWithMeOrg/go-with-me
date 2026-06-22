import { registerEnumType } from '@nestjs/graphql';

export enum PrivacyVisibility {
    EVERYONE = 'EVERYONE',
    COMPANIONS = 'COMPANIONS',
    MARKED_COMPANIONS = 'MARKED_COMPANIONS',
}

registerEnumType(PrivacyVisibility, { name: 'PrivacyVisibility' });
