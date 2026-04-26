'use client';

import { GET_EVENTS_BY_ID } from '@/app/graphql/queries/events';
import { Event as EventType } from '@/app/graphql/types';
import Spinner from '@/assets/icons/spinner.svg';
import { Backdrop } from '@/components/widgets/Backdrop';
import { CommentsList } from '@/components/widgets/Comments';
import { Event } from '@/components/widgets/Event';
import { useQuery } from '@apollo/client/react';
import type { NextPage } from 'next';
import { useParams } from 'next/navigation';

import classes from '../page.module.css';

interface PageProps {
    params: Promise<{ event_id: string }>;
}

const EventPage: NextPage<PageProps> = () => {
    const params = useParams();

    const event_id = params.event_id as string;

    const { data, error, loading } = useQuery<{ getEventById: EventType }>(GET_EVENTS_BY_ID, {
        variables: { eventId: event_id },
    });

    if (loading && !error) {
        return <Spinner className={classes.spinner} />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={classes.event}>
            {/* <Backdrop marginTop={430} marginBottom={274} contentLoading={loading}> */}
            {data && <Event event={data.getEventById} />}

            {event_id && <CommentsList event_id={event_id} />}
            {/* </Backdrop> */}
        </section>
    );
};

export default EventPage;
