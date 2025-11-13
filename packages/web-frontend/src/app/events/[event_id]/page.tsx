'use client';

import Spinner from '@/assets/icons/spinner.svg';
import { ButtonBack } from '@/components/shared/ButtonBack';
import { Backdrop } from '@/components/widgets/Backdrop';
import { CommentsList } from '@/components/widgets/CommentsList';
import { Event } from '@/components/widgets/Event';
import type { IComment } from '@go-with-me/api-scheme/types/Comment';
import type { IEvent } from '@go-with-me/api-scheme/types/Event';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

import classes from '../page.module.css';

interface PageProps {
  params: Promise<{ event_id: string }>;
}

interface GetEventByIdData {
  event: IEvent;
  comments: IComment[];
}

const GET_EVENT_BY_ID = gql`
  #graphql
  query GetEventById($id: ID!) {
    event(id: $id) {
      _id
      organizer_id
      organizer {
        _id
        name
        email
        image
      }
      name
      location {
        coordinates
        properties {
          address
        }
      }
      status
      description
      startDate
      endDate
      time
      categories
      types
      tags
      image
    }
    comments(event_id: $id) {
      _id
      author {
        _id
        name
        email
      }
      content
      createdAt
      updatedAt
      likes
      replies {
        _id
        author {
          _id
          name
          email
        }
        content
        createdAt
        updatedAt
        likes
      }
    }
  }
`;

const EventPage: NextPage<PageProps> = () => {
  const params = useParams();
  const { data: session, status } = useSession();

  const event_id = params.event_id as string;

  const { data, error, loading, refetch } = useQuery<GetEventByIdData>(GET_EVENT_BY_ID, {
    variables: { id: event_id },
  });

  refetch();

  if (loading && !error) {
    return <Spinner className={classes.spinner} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className={classes.event}>
      {status === 'authenticated' && <ButtonBack />}

      <Backdrop marginTop={430} marginBottom={274} contentLoading={loading}>
        {data?.event && <Event event={data.event} />}

        {status === 'authenticated' && data?.comments && (
          <CommentsList {...{ comments: data.comments, event_id, refetch }} />
        )}
      </Backdrop>
    </section>
  );
};

export default EventPage;
