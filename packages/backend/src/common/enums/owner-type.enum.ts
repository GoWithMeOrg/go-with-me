import { registerEnumType } from '@nestjs/graphql';

export enum OwnerType {
    USER = 'User',
    EVENT = 'Event',
    TRIP = 'Trip',
    COMMENT = 'Comment',
}

registerEnumType(OwnerType, { name: 'OwnerType' });
