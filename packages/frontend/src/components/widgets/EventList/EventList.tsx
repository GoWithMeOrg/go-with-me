'use client';

import { FC } from 'react';
import { Event } from '@/app/graphql/types';
import { Backdrop } from '@/components/widgets/Backdrop';
import { CardEvent } from '@/components/widgets/CardEvent';

import { useEventList } from './hooks';
import { EventListProps } from './types/EventList';

import classes from './EventList.module.css';

export const EventList: FC<EventListProps> = ({ sizeCard }) => {
    const { loading, error, events, refetch } = useEventList();

    // refetch();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!events) return;

    return (
        <Backdrop marginTop={84} marginBottom={440} contentLoading={loading}>
            <ul className={classes.list}>
                {events.map(
                    ({ _id, description, name, startDate, time, location, image }: Event) => (
                        <li key={_id}>
                            <CardEvent
                                id={_id}
                                name={name}
                                description={description as string}
                                coord={location?.geometry.coordinates}
                                startDate={startDate as string}
                                time={time as string}
                                image={image as string}
                                size={sizeCard}
                            />
                        </li>
                    )
                )}
            </ul>
        </Backdrop>
    );
};
