export enum ConditionEvent {
  CANCELED = 'Canceled',
  FINALIZED = 'Finalized',
}

export enum InvitationResponseStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface Invited {
  user: string;
  invitation: string;
  status: InvitationResponseStatus;
  respondedAt?: Date;
}

export interface Invitation {
  id: string;
  event: string;
  sender: string;
  createdAt?: Date;
  updatedAt?: Date;
}
