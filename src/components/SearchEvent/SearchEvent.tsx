import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

interface SearchEventProps {
    tripId: string;
    organizerId: string;
}

const GET_SEARCH = gql`
    query Search($text: String!) {
        search(text: $text) {
            _id
            organizer_id
            tripName
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
            tripName
            description
            events_id
            startDate
            endDate
        }
    }
`;

const GET_TRIP_BY_ID = gql`
    query GetTripById($tripId: ID!) {
        trip(id: $tripId) {
            events_id
        }
    }
`;

const SearchEvents = ({ tripId, organizerId }: SearchEventProps) => {
    const [searchHandler, setSearchHandler] = useState("");
    const [events, setEvents] = useState<string[]>([]);
    const { data, loading, error } = useQuery(GET_SEARCH, {
        variables: { text: searchHandler },
    });

    const { data: tripData } = useQuery(GET_TRIP_BY_ID, { variables: { tripId } });
    const eventsId = tripData?.trip?.events_id;

    const [updateTrip] = useMutation(UPDATE_TRIP);
    const handleSearch = () => {
        setSearchHandler(searchHandler);
    };

    const handleAddEvent = async (eventId: string) => {
        try {
            if (!eventsId?.includes(eventId)) {
                const updatedEvents = [...(eventsId || []), eventId];
                const { data } = await updateTrip({
                    variables: {
                        id: tripId,
                        trip: { events_id: updatedEvents, organizer_id: organizerId },
                    },
                });
                const updatedTrip = data.updateTrip;
                setEvents(updatedTrip.events_id);
            } else {
                console.log("Event already added: ", eventId);
            }
        } catch (error) {
            console.error("Ошибка при обновлении поездки:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchHandler}
                onChange={(e) => setSearchHandler(e.target.value)}
                placeholder="Введите поисковый запрос..."
            />
            <button onClick={handleSearch}>search events</button>
            {loading && <p>Загрузка...</p>}
            {data && data.search && (
                <div>
                    {data.search.map((event: any) => (
                        <div key={event._id}>
                            <h2>{event.tripName}</h2>
                            <p>{event.description}</p>
                            <p>Дата начала: {event.startDate}</p>
                            <p>Дата окончания: {event.endDate}</p>
                            <p>Местоположение: {event.locationName}</p>
                            <button onClick={() => handleAddEvent(event._id)}>add event</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchEvents;
