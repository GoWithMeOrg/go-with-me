export enum ConditionEvent {
  CANCELED = 'Canceled',
  FINALIZED = 'Finalized',
}

export enum InvitationResponseStatus {
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface Invitation {
  _id: string;
  event: string;
  sender: string;
  receiver: string;
  status: InvitationResponseStatus;
  respondedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
