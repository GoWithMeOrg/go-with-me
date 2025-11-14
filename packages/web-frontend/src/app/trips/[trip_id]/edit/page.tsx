'use client';

import { TripForm } from '@/components/widgets/TripForm';
import type { ITrip } from '@go-with-me/api-scheme/types/Trip';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ trip_id: string }>;
}

const GET_TRIP = gql`
  query GetTrip($id: ID!) {
    trip(id: $id) {
      _id
      organizer {
        _id
        name
        email
        image
      }
      name
      description
      startDate
      endDate
      events_id
      events {
        _id
        name
        description
      }
    }
  }
`;

const UPDATE_TRIP = gql`
  mutation UpdateTrip($id: ID!, $trip: TripInput) {
    updateTrip(id: $id, trip: $trip) {
      _id
      organizer {
        _id
        name
        email
        image
      }
      name
      description
      events_id
      startDate
      endDate
    }
  }
`;

const TripEditPage: NextPage<PageProps> = () => {
  const router = useRouter();
  const params = useParams();
  const trip_id = params.trip_id;
  const { loading, error, data } = useQuery(GET_TRIP, {
    variables: { id: trip_id },
  });

  const [updateTrip] = useMutation(UPDATE_TRIP);

  const handleEdit = (eventEdited: Partial<ITrip>) => {
    updateTrip({
      variables: {
        id: trip_id,
        trip: eventEdited,
      },
    }).then((response) => {
      console.log('TripEditPage: ', response);
      router.push(`/trips/${trip_id}`);
    });
  };

  return (
    <div className="TripEditPage">
      <h3>Edit Trip {data?.trip?.name}</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {!error && data?.trip && <TripForm tripData={data.trip} onSubmit={handleEdit} />}
    </div>
  );
};

export default TripEditPage;
