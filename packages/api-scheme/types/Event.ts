import { IUser } from "./User";

export interface IEvent {
  _id: string;
  organizer_id: string;
  organizer: IUser;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  time?: string;
  createdAt: Date;
  updatedAt: Date;
  location: {
    type: "Point";
    coordinates: [number, number];
    properties: {
      address: string;
    };
  };
  status: string;
  categories?: string[];
  types?: string[];
  tags?: string[];
  image?: string;
}
