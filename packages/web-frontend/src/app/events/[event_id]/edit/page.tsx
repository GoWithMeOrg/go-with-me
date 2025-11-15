'use client';

import { ButtonBack } from '@/components/shared/ButtonBack';
import { Loader } from '@/components/shared/Loader';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm/EventForm';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import type { IEvent } from '@go-with-me/api-scheme/types/Event';
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';

import classes from '../../new/page.module.css';

interface PageProps {
  params: Promise<{ event_id: string }>;
}

interface GetEventData {
  event: IEvent;
}

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      _id
      organizer_id
      organizer {
        _id
        name
        email
        image
        emailVerified
      }
      name
      location {
        coordinates
        properties {
          address
        }
      }
      description
      startDate
      endDate
      time
      status
      categories
      types
      tags
      image
    }
  }
`;

const UPDATE_EVENT = gql`
  #graphql
  mutation UpdateEvent($id: ID!, $event: EventInput!) {
    updateEvent(id: $id, event: $event) {
      name
      description
      status
      startDate
      endDate
      time
      categories
      types
      image
    }
  }
`;

const EventEditPage: NextPage<PageProps> = () => {
  const router = useRouter();
  const params = useParams();
  const event_id = params.event_id;

  const { loading, error, data, refetch } = useQuery<GetEventData>(GET_EVENT, {
    variables: { id: event_id },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT);

  const handleEditEvent = (eventEdited: Partial<IEvent>) => {
    updateEvent({
      variables: {
        id: event_id,
        event: { ...eventEdited, organizer_id: data?.event?.organizer_id },
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

      {!error && data?.event && (
        <EventForm eventData={data.event} onSubmitEvent={handleEditEvent} />
      )}
    </div>
  );
};

export default EventEditPage;
