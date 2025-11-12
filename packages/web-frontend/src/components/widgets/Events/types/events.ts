export interface IInvitation {
  id: string;
  createdAt: Date;
  invitation: {
    id: string;
    event: {
      _id: string;
      image: string;
      name: string;
      location: {
        coordinates: [number, number];
      };
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
  };
  status: string;
  user: {
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
