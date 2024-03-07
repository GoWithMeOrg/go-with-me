"use client";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styles from "./EventsList.module.css";
import Link from "next/link";

const GET_SEARCH = gql`
    query Search($text: String!) {
        search(text: $text) {
            _id
            organizer_id
            name
            description
            startDate
            endDate
            locationName
        }
    }
`;

const UPDATE_TRIP = gql`
    mutation UpdateTrip($id: ID!, $trip: TripInput) {
        updateTrip(id: $id, trip: $trip) {
            organizer {
                _id
            }
            name
            description
            startDate
            endDate
        }
    }
`;

const GET_TRIP_BY_ID = gql`
    query GetTripById($tripId: ID!) {
        trip(id: $tripId) {
            organizer_id
            events_id
        }
    }
`;

const EventsList = ({ text, tripId }: { text: string; tripId: string }) => {
    const { data: searchData } = useQuery(GET_SEARCH, {
        variables: { text },
    });

    const { data: tripData, refetch } = useQuery(GET_TRIP_BY_ID, { variables: { tripId } });
    const organizerId = tripData?.trip?.organizer_id;
    const [updateTrip] = useMutation(UPDATE_TRIP);

    const handleAddEvent = async (eventId: string) => {
        await refetch(); // Получаем новые данные tripData?.trip?.events_id из БД
        const eventsIdDB = tripData?.trip?.events_id || []; // Получаем массив events_id для текущего пользователя из базы данных
        const updatedEventsIdDB = new Set(eventsIdDB); // Создаем новый объект Set на основе массива events_id
        updatedEventsIdDB.add(eventId); // Добавляем новый eventId в объект Set
        await updateTrip({
            variables: {
                id: tripId,
                trip: { events_id: Array.from(updatedEventsIdDB), organizer_id: organizerId },
            },
        }); // Обновляем trip с новым массивом events_id
        await refetch();
    };

    return (
        searchData &&
        searchData.search &&
        searchData.search.map((event: any) => (
            <div key={event._id}>
                <ul>
                    <li className={styles.checkbox}>
                        <Link href={`/events/${event._id}`}>{event.name}</Link>
                        <button type="button" onClick={() => handleAddEvent(event._id)}>
                            add event
                        </button>
                    </li>
                </ul>
            </div>
        ))
    );
};

export default EventsList;
