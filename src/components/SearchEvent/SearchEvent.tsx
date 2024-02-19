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
            tripName
            description
            events_id
            startDate
            endDate
        }
    }
`;

const SearchEvents = ({ tripId, organizerId }: SearchEventProps) => {
    const [searchHandler, setSearchHandler] = useState("");
    const [events, setEvents] = useState<string[]>([]);
    const { data, loading, error } = useQuery(GET_SEARCH, {
        variables: { text: searchHandler },
    });
    const [updateTrip] = useMutation(UPDATE_TRIP);

    const handleSearch = () => {
        setSearchHandler(searchHandler);
    };

    const handleAddEvents = async (eventId: string) => {
        try {
            console.log("Add event: ", eventId);
            const updatedEvents = [...events, eventId];
            const { data } = await updateTrip({
                variables: {
                    id: tripId,
                    trip: { events_id: updatedEvents, organizer_id: organizerId },
                },
            });
            const updatedTrip = data.updateTrip;
            setEvents(updatedTrip.events_id);
        } catch (error) {
            console.error("Ошибка при обновлении поездки:", error);
        }
    };

    // const handleRemoveEvent = (eventId: string) => {
    //     // const updatedEvents = events.filter((event) => event !== eventId);
    //     // setEvents(updatedEvents);
    //     // console.log(updatedEvents);
    //     try {
    //         const { data } = await deleteEvent({
    //             variables: { id: eventIdToRemove },
    //         });
    //         // Обработка успешного удаления event_id
    //     } catch (error) {
    //         console.error("Ошибка при удалении event_id:", error);
    //         // Обработка ошибки при удалении event_id
    //     }
    // };

    // const removeEventFromTrip = async (eventIdToRemove: string) => {
    //     try {
    //         const { data } = await updateTrip({
    //             variables: {
    //                 id: tripId,
    //                 trip: { removeEvents: [eventIdToRemove], organizer_id: organizerId },
    //             },
    //         });
    //         // Обработка успешного удаления event_id из массива
    //     } catch (error) {
    //         console.error("Ошибка при удалении event_id из массива:", error);
    //         // Обработка ошибки при удалении event_id из массива
    //     }
    // };

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
                            <button onClick={() => handleAddEvents(event._id)}>add event</button>
                            {/* <button onClick={() => removeEventFromTrip(event._id)}>remove event</button> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchEvents;
