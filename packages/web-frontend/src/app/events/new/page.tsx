'use client';

import { ButtonBack } from '@/components/shared/ButtonBack';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm';
import { EventType } from '@/components/widgets/EventForm/EventForm';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import classes from './page.module.css';

const CREATE_EVENT = gql`
    mutation CreateEvent($event: EventInput!) {
        createEvent(event: $event) {
            _id
        }
    }
`;

const EventNewPage: NextPage = () => {
    const router = useRouter();
    const dataSession = useSession();
    //@ts-ignore
    const [createEvent] = useMutation<{ createEvent: { _id: string } }>(CREATE_EVENT);
    //@ts-ignore
    const organizerId = (dataSession?.data?.session?.user as { id: string })?.id;
    //console.log(session); //данные сессии пользователя

    const handleCreateEvent = async (event: EventType) => {
        createEvent({
            variables: {
                event: { ...event, organizer_id: organizerId },
            },
        }).then((response) => {
            router.push(`/events/${response.data?.createEvent?._id}`);
        });
    };

    return (
        <div className={classes.createEventFormWrapper}>
            <ButtonBack />

            <Title className={classes.createEventTitle} title="CREATE EVENT" tag={'h2'} />

            <EventForm eventData={{}} onSubmitEvent={handleCreateEvent} />
        </div>
    );
};

export default EventNewPage;
