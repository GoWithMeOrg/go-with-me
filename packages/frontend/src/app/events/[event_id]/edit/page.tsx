'use client';

import { GET_EVENTS_BY_ID } from '@/app/graphql/queries/events';
import type { Event } from '@/app/graphql/types';
import { ButtonBack } from '@/components/shared/ButtonBack';
import { Loader } from '@/components/shared/Loader';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm/EventForm';
import { useQuery } from '@apollo/client/react';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';

import classes from '../../new/page.module.css';

interface PageProps {
    params: Promise<{ event_id: string }>;
}

const EventEditPage: NextPage<PageProps> = () => {
    const params = useParams();
    const event_id = params.event_id;

    const { loading, error, data, refetch } = useQuery<{ getEventById: Event }>(GET_EVENTS_BY_ID, {
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
