'use client';

import { GET_EVENTS_BY_ID } from '@/app/graphql/queries/events';
import { ButtonBack } from '@/components/shared/ButtonBack';
import { Loader } from '@/components/shared/Loader';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm/EventForm';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';

import classes from '../../new/page.module.css';

interface PageProps {
    params: Promise<{ event_id: string }>;
}

interface GetEventData {
    event: Event;
}

const UPDATE_EVENT_MUTATION = gql`
    mutation UpdateEvent(
        $updateEventId: ID!
        $updateEventInput: UpdateEventInput!
        $createTagInput: CreateTagInput
        $createLocationInput: CreateLocationInput
        $createInterestInput: CreateInterestInput
        $createCategoryInput: CreateCategoryInput
    ) {
        updateEvent(
            id: $updateEventId
            updateEventInput: $updateEventInput
            createTagInput: $createTagInput
            createLocationInput: $createLocationInput
            createInterestInput: $createInterestInput
            createCategoryInput: $createCategoryInput
        ) {
            _id
        }
    }
`;

const EventEditPage: NextPage<PageProps> = () => {
    const router = useRouter();
    const params = useParams();
    const event_id = params.event_id;

    const { loading, error, data, refetch } = useQuery<{ getEventById: Event }>(GET_EVENTS_BY_ID, {
        variables: { eventId: event_id },
    });

    console.log(data);

    console.log(data);
    const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION);

    const handleEditEvent = (eventEdited: Partial<Event>) => {
        updateEvent({
            variables: {
                id: event_id,
                event: { ...eventEdited },
            },
        }).then((response) => {
            console.log('EventEditPage: ', response);
            router.push(`/events/${event_id}`);
        });
        refetch();
    };

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
