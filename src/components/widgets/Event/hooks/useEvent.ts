import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@apollo/client";

import dayjs from "dayjs";
import gql from "graphql-tag";

import { IEvent } from "@/database/models/Event";

import { useUploadFile } from "@/components/widgets/UploadFile/hooks";

export interface EventProps {
    event: IEvent;
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

const useEvent = ({ event }: EventProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION);
    const { getDeleteFile } = useUploadFile({});

    const [organizer, setOrganizer] = useState(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        event.location !== undefined
            ? {
                  lng: event.location.coordinates[0],
                  lat: event.location?.coordinates[1],
              }
            : null,
    );

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const url = `${window.location.origin}${pathname}${searchParams ? `?${searchParams}` : ""}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Ошибка копирования: ", err);
        }
    };

    useEffect(() => {
        //@ts-ignore
        setOrganizer(session?.user?.id === event.organizer_id);
        //@ts-ignore
    }, [event.organizer_id, session?.user?.id]);

    const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
        variables: {
            limit: 0,
            offset: 0,
            sort: "startDate",
        },
    });

    const handleDelete = async (eventId: string) => {
        try {
            await deleteEventMutation({
                variables: { id: eventId },
            });

            //Находим картинку события
            const imageUrl = data.events.find((event: any) => event._id === eventId).image;
            //удаляем картинку
            await getDeleteFile(imageUrl);
            router.push("/events");
            //await refetch();
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const coord: [number, number] = [event.location.coordinates[0] as number, event.location.coordinates[1] as number];

    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const dayOfWeek = dayjs(event.startDate).day();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[dayOfWeek];

    return {
        organizer,
        setOrganizer,
        showPopup,
        setShowPopup,
        markerPosition,
        handleDelete,
        handleShowMap,
        coord,
        day,
        copied,
        handleCopyLink,
    };
};

export default useEvent;
