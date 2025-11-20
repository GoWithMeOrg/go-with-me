'use client';

import { FC } from 'react';
import { Backdrop } from '@/components/widgets/Backdrop';
import { CardEvent } from '@/components/widgets/CardEvent';
import type { IEvent } from '@/types';

import { useEventList } from './hooks';
import { EventListProps } from './types/EventList';

import classes from './EventList.module.css';

export const EventList: FC<EventListProps> = ({ sizeCard, limit, sort }) => {
  const { loading, error, events, refetch } = useEventList({ limit, sort });

  // refetch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!events) return;

  return (
    <Backdrop marginTop={84} marginBottom={440} contentLoading={loading}>
      <ul className={classes.list}>
        {events.map(({ _id, description, name, startDate, time, location, image }: IEvent) => (
          <li key={_id}>
            <CardEvent
              id={_id}
              name={name}
              description={description}
              coord={[location.coordinates[0], location.coordinates[1]]}
              startDate={startDate}
              time={time}
              image={image}
              size={sizeCard}
            />
          </li>
        ))}
      </ul>
    </Backdrop>
  );
};
