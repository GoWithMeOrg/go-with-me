export interface IInvitation {
  _id: string;
  createdAt: Date;
  event: {
    _id: string;
    image: string;
    name: string;
    location: {
      coordinates: [number, number];
    } | null;
    startDate: string;
    time: string;
    organizer: {
      _id: string;
      name: string;
    };
  };
  sender: {
    _id: string;
    name: string;
  };
  status: string;
  receiver: {
    _id: string;
  };
}

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  startDate?: Date | string;
  time?: string;
  createdAt: Date | string;
  location: {
    type: 'Point';
    coordinates: [number, number];
    properties: {
      address: string;
    };
  };
  image?: string;
}

export enum TabType {
  UPCOMING = 'Upcoming',
  WATCHLIST = 'Watch list',
  DECLINED = 'Declined',
  PAST = 'Past',
  ORGANIZED = 'Organized by me',
}
