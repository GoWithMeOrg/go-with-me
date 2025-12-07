export type IJoined = {
  _id: string;
  event_id: string;
  user_id: string;
  isJoined: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export interface IGetJoined {
  joinedByUsers: IJoined[];
}
