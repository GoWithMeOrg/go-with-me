import { registerEnumType } from '@nestjs/graphql';

export enum Resource {
    EVENT = 'EVENT',
    TRIP = 'TRIP',
    COMMENT = 'COMMENT',
    USER = 'USER',
    ROLE = 'ROLE',
}

registerEnumType(Resource, { name: 'Resource' });
