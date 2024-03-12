import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import classes from "./TripFormEvents.module.css";
import Link from "next/link";
import { useState } from "react";

type TripFormEventsProps = {
    tripID: string;
};

/**
 * Этот компонент будет сам полчать данные о событиях по ID поездки
 * Также он должен уметь добавлять новые события
 * и удалять существующие
 *
 * @param tripID
 * @constructor
 */

const GET_TRIP_BY_ID = gql`
    query GetTripById($tripId: ID!) {
        trip(id: $tripId) {
            organizer_id
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

const TripFormEvents = ({ tripID }: TripFormEventsProps) => {
    // Получить данные о событиях по ID поездки tripID
    const { data: tripData, refetch } = useQuery(GET_TRIP_BY_ID, { variables: { tripId: tripID } });
    const [updateTrip] = useMutation(UPDATE_TRIP);

    //Найти события по тексту
    const [text, setText] = useState("");
    const { data: searchData } = useQuery(GET_SEARCH, {
        variables: { text },
    });

    // Обработчик добавления найденного события в поездку
    const handleAddEvent = async (eventId: string) => {
        await refetch();
        const eventsIdDB = tripData?.trip?.events_id || [];
        const updatedEventsIdDB = new Set(eventsIdDB);
        updatedEventsIdDB.add(eventId);
        await updateTrip({
            variables: {
                id: tripID,
                trip: { events_id: Array.from(updatedEventsIdDB), organizer_id: tripData?.trip.organizer_id },
            },
        });
        await refetch();
    };

    // Обработчик удаления события из поездки
    const handleDelEvent = async (eventId: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const eventsIdDB = tripData?.trip?.events_id || [];
        let updatedEventsIdDB = eventsIdDB?.filter((id: string) => id !== eventId);
        await updateTrip({
            variables: {
                id: tripID,
                trip: { events_id: updatedEventsIdDB, organizer_id: tripData?.trip.organizer_id },
            },
        });
        await refetch();
    };

    return (
        <div className={classes.component}>
            <h3>События для поездки</h3>
            <ul>
                {tripData?.trip?.events?.map((event: any) => (
                    <li key={event._id} className={classes.eventName}>
                        <Link href={`/events/${event._id}`}>{event.name}</Link>
                        <button onClick={(e) => handleDelEvent(event._id, e)}>Remove event</button>
                    </li>
                ))}
            </ul>
            {/* Список событий в поездке tripID.
             у каждого события должна быть кнопка удаления
             */}

            <h3>Найти и сохранить событие в поездке</h3>

            <input
                className="search"
                placeholder="search"
                value={text}
                onChange={(e) => setText(e.target.value)}
                //placeholder="Введите поисковый запрос..."
            />

            <ul>
                {searchData?.search?.map((event: any) => (
                    <li key={event._id} className={classes.eventName}>
                        <Link href={`/events/${event._id}`}>{event.name}</Link>
                        <button type="button" onClick={() => handleAddEvent(event._id)}>
                            add event
                        </button>
                    </li>
                ))}
            </ul>

            {/*  инпут для поиска события

                найденные события отображаются в списке
                у каждого события должна быть кнопка добавления в поездку tripID

              */}
        </div>
    );
};

export { TripFormEvents };
