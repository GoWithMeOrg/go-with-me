'use client';

import { useQuery } from '@apollo/client/react';
import type { Event } from '@go-with-me/shared/graphql';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';

import { GET_EVENTS_BY_ID } from '@/app/graphql/queries/events';
import { ButtonBack } from '@/components/shared/ButtonBack';
import { Loader } from '@/components/shared/Loader';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm/EventForm';

import classes from '../../new/page.module.css';

interface PageProps {
    params: Promise<{ event_id: string }>;
}

const EventEditPage: NextPage<PageProps> = () => {
    const params = useParams();
    const event_id = params.event_id;

    const { loading, error, data } = useQuery<{ getEventById: Event }>(GET_EVENTS_BY_ID, {
        variables: { eventId: event_id },
    });

    return (
        <div className={classes.createEventFormWrapper}>
            <ButtonBack />

            <Title className={classes.createEventTitle} title="РЕДАКТИРОВАНИЕ СОБЫТИЯ" tag={'h2'} />

            {loading && <Loader num={1} />}
            {error && <p>Error : {error.message}</p>}

            {!error && data?.getEventById && <EventForm eventData={data?.getEventById} />}
        </div>
    );
};

export default EventEditPage;
