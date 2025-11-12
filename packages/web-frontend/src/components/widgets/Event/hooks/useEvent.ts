'use client';

import { useEffect, useState } from 'react';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { IEvent } from '@/database/models/Event';
import { useMutation, useQuery } from '@apollo/client/react';
import dayjs from 'dayjs';
import gql from 'graphql-tag';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface EventProps {
  event: IEvent;
  sessionUserID?: string | null;
}

const GET_EVENTS = gql`
  query GetEvents($limit: Int!, $offset: Int!, $sort: String!) {
    events(limit: $limit, offset: $offset, sort: $sort) {
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
      time
      location {
        coordinates
        properties {
          address
        }
      }
      status
      categories
      tags
      image
    }
  }
`;

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      _id
    }
  }
`;

const useEvent = ({ event, sessionUserID }: EventProps) => {
  const router = useRouter();

  const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION);
  const { getDeleteFile } = useUploadFile({});

  const [organizer, setOrganizer] = useState(true);
  const [copied, setCopied] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    event?.location !== undefined
      ? {
          lng: event.location.coordinates[0],
          lat: event.location?.coordinates[1],
        }
      : null
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();

  let url: string;
  if (typeof window !== 'undefined')
    url = `${window.location.origin}${pathname}${searchParams ? `?${searchParams}` : ''}`;

  const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
    variables: {
      limit: 0,
      offset: 0,
      sort: 'startDate',
    },
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования: ', err);
    }
  };

  useEffect(() => {
    setOrganizer(sessionUserID === event?.organizer_id);
  }, [event?.organizer_id, sessionUserID]);

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEventMutation({
        variables: { id: eventId },
      });

      //Находим картинку события
      const imageUrl = data.events.find((event: any) => event?._id === eventId).image;
      //удаляем картинку
      await getDeleteFile(imageUrl);
      router.push('/events');
    } catch (error) {
      console.error('Error deleting event: ', error);
    }
  };

  const coord: [number, number] = [
    event?.location.coordinates[0] as number,
    event?.location.coordinates[1] as number,
  ];

  const dayOfWeek = dayjs(event?.startDate).day();
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const day = days[dayOfWeek];

  return {
    organizer,
    setOrganizer,
    markerPosition,
    handleDelete,
    coord,
    day,
    copied,
    handleCopyLink,
  };
};

export default useEvent;
