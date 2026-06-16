import { registerEnumType } from '@nestjs/graphql';

export enum InvitationResponseStatus {
    INVITED = 'INVITED',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED',
    PENDING = 'PENDING',
}

registerEnumType(InvitationResponseStatus, { name: 'InvitationResponseStatus' });
