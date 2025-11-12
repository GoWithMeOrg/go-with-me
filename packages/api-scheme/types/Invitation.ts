export enum ConditionEvent {
  CANCELED = 'Canceled',
  FINALIZED = 'Finalized',
}

export enum InvitationResponseStatus {
  INVITED = 'Invited',
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
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
