'use client';

import { useState } from 'react';
import { REMOVE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import { Event as EventType } from '@/app/graphql/types';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useUserID } from '@/hooks/useUserID';
import { useMutation } from '@apollo/client/react';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface EventProps {
    event: EventType;
}

const useEvent = ({ event }: EventProps) => {
    const { user_id } = useUserID();
    const router = useRouter();

    const [removeEvent] = useMutation(REMOVE_EVENT_MUTATION);
    const { deleteFile } = useUploadFile({ folder: 'users/events' });

    const organizer = user_id === event?.organizer._id;
    const [copied, setCopied] = useState(false);
    const [markerPosition] = useState(
        event?.location !== undefined
            ? {
                  lng: event?.location?.geometry?.coordinates[0] as number,
                  lat: event.location?.geometry?.coordinates[1] as number,
              }
            : null
    );

    const pathname = usePathname();
    const searchParams = useSearchParams();

    let url: string;
    if (typeof window !== 'undefined')
        url = `${window.location.origin}${pathname}${searchParams ? `?${searchParams}` : ''}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Ошибка копирования: ', err);
        }
    };

    const handleRemoveEvent = async (eventId: string) => {
        try {
            // Находим картинку события перед удалением
            const eventData = event?.image;

            await removeEvent({
                variables: { eventId },
            });

            // Удаляем картинку
            if (eventData) {
                await deleteFile(eventData);
            }
            router.push('/events');
        } catch (error) {
            console.error('Error deleting event: ', error);
        }
    };

    const coord: [number, number] = event?.location?.geometry.coordinates as [number, number];
    const dayOfWeek = dayjs(event?.startDate).day();
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const day = days[dayOfWeek];

    return {
        organizer,
        markerPosition,
        handleRemoveEvent,
        coord,
        day,
        copied,
        handleCopyLink,
    };
};

export default useEvent;
