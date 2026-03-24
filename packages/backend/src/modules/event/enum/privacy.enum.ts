import { registerEnumType } from '@nestjs/graphql';

export enum Privacy {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

registerEnumType(Privacy, { name: 'Privacy' });
