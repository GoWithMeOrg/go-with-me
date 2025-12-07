export enum CompanionRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
export interface ICompanionRequest {
  id: string;
  sender: string;
  receiver: string;
  status: CompanionRequestStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
