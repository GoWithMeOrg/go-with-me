'use client';

import { FC } from 'react';
import { Event } from '@/app/graphql/types';
import { Backdrop } from '@/components/widgets/Backdrop';
import { CardEvent, CardEventSkeleton } from '@/components/widgets/CardEvent';

import { useEventList } from './hooks';
import { EventListProps } from './types/EventList';

import classes from './EventList.module.css';

const SKELETON_COUNT = 3;

export const EventList: FC<EventListProps> = ({ limit, offset, sort }) => {
    const { loading, error, events } = useEventList({ limit, offset, sort });

    if (loading) {
        return (
            <div className={classes.skeleton}>
                {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                    <CardEventSkeleton key={i} />
                ))}
            </div>
        );
    }

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
                            />
                        </li>
                    )
                )}
            </ul>
        </Backdrop>
    );
};
