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

// const UPDATE_TRIP = gql`
//     mutation UpdateTrip($id: ID!, $trip: TripInput) {
//         updateTrip(id: $id, trip: $trip) {
//             _id
//             organizer_id
//             tripName
//             description
//             events_id
//             startDate
//             endDate
//         }
//     }
// `;

const SearchEvents = ({ tripId, organizerId }: SearchEventProps) => {
    const [searchEvent, setSearchEvent] = useState("");
    //const [events, setEvents] = useState<string[]>([]);
    const { data, loading, error } = useQuery(GET_SEARCH, {
        variables: { text: searchEvent },
    });

    //const [updateTrip] = useMutation(UPDATE_TRIP);

    const handleSearch = () => {
        setSearchEvent(searchEvent);
    };

    const handleAddEvents = async (eventId: string) => {
        console.log(eventId);
        // try {
        //     const updatedEvents = [...events, eventId];
        //     const { data } = await updateTrip({
        //         variables: {
        //             id: tripId,
        //             trip: { events_id: updatedEvents },
        //         },
        //     });
        //     const updatedTrip = data.updateTrip;
        //     setEvents(updatedTrip.events_id);
        // } catch (error) {
        //     console.error("Ошибка при обновлении поездки:", error);
        // }
    };

    return (
        <div>
            <input
                type="text"
                value={searchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchEvents;
