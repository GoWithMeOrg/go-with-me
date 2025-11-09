import { IUser } from "./User";
import { IEvent } from "./Event";

export interface ITrip {
  _id: string;
  organizer_id: string;
  organizer: IUser;
  name: string;
  description: string;
  isPrivate: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  events_id: string[];
  events: IEvent[];
}
