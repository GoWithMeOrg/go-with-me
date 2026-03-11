'use client';

import { CREATE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import { ButtonBack } from '@/components/shared/ButtonBack';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm';
import { EventType } from '@/components/widgets/EventForm/EventForm';
import { useMutation } from '@apollo/client/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import classes from './page.module.css';

const EventNewPage: NextPage = () => {
    const router = useRouter();

    // const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    // const handleCreateEvent = async (event: EventType) => {
    //     createEvent({
    //         variables: {
    //             event,
    //         },
    //     }).then((response) => {
    //         router.push(`/events/${response.data?.createEvent?._id}`);
    //     });
    // };

    return (
        <div className={classes.createEventFormWrapper}>
            <ButtonBack />

            <Title className={classes.createEventTitle} title="CREATE EVENT" tag={'h2'} />

            <EventForm
                eventData={{}}
                // onSubmitEvent={handleCreateEvent}
            />
        </div>
    );
};

export default EventNewPage;
