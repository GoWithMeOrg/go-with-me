import { registerEnumType } from '@nestjs/graphql';

export enum CompanionRequestStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED',
    BLOCKED = 'BLOCKED',
}

registerEnumType(CompanionRequestStatus, { name: 'CompanionRequestStatus' });
