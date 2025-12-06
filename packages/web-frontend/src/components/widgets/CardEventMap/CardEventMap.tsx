import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import Link from 'next/link';

import CardEvent, { SizeCard } from '../CardEvent/CardEvent';

import classes from './CardEventMap.module.css';

interface IEvent {
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

interface CardEventMapProp {
  selectedEvent: IEvent;
}

export function CardEventMap({ selectedEvent }: CardEventMapProp) {
  const { _id, description, image, location, name, startDate, time } = selectedEvent;

  return (
    <div className={classes.wrapperCard}>
      <CardEvent
        id={_id}
        coord={[location.coordinates[0], location.coordinates[1]]}
        name={name}
        description={description}
        image={image}
        time={time}
        startDate={startDate}
        size={SizeCard.ML}
      />
      <Link href={`/events/${_id}`} className={classes.linkEvent}>
        <span className={classes.linkText}>To event</span>
        <ArrowCircle />
      </Link>
    </div>
  );
}
