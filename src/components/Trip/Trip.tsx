/* TODO
 *
 * В Trip нужно вывйти список событий (Event), которые входят в этот трип
 *
 *  */

import { ITrip } from "@/database/models/Trip";
import gql from "graphql-tag";
import classes from "@/components/EventForm/EventForm.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { FC, useState } from "react";
import { formatDate } from "@/utils/formatDate";

export interface TripProps {
    event: ITrip;
}

const GET_EVENTS = gql`
    query GetEvents {
        events {
            _id
            organizer {
                _id
                name
                email
                image
            }

            tripName
            description
            isPrivate
            startDate
            endDate
            locationName
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

const Trip: FC<TripProps> = ({ event }) => {
    const { data: eventData } = useQuery(GET_EVENTS);
    const tripId = event?._id;
    const organizerId = event?.organizer?._id;
    const [events, setEvents] = useState([]);

    console.log(event);
    const { data: tripData } = useQuery(GET_TRIP_BY_ID, { variables: { tripId } });
    const eventsId = tripData?.trip?.events_id;

    const [updateTrip] = useMutation(UPDATE_TRIP);
    //console.log(eventsId);
    const handleDeleteEvent = async (eventId: string) => {
        try {
            const updatedEvents = eventsId.filter((id: string) => id !== eventId);
            const { data: tripData } = await updateTrip({
                variables: {
                    id: tripId,
                    trip: { events_id: updatedEvents, organizer_id: organizerId },
                },
            });
            const updatedTrip = tripData.updateTrip;
            setEvents(updatedTrip.events_id);
            console.log("Trip deleted successfully:", updatedTrip);
        } catch (error) {
            console.error("Ошибка при обновлении поездки:", error);
        }
    };

    return (
        <div className={classes.component}>
            <h3 className={classes.header}>{event.tripName}</h3>
            <div>Организатор: {event.organizer ? event.organizer.name : "Нет информации"}</div>
            <div>{event.description}</div>
            <div>{formatDate(event.startDate, "dd LLLL yyyy")}</div>
            <div>{formatDate(event.endDate, "dd LLLL yyyy")}</div>
            {/* {event.isPrivate && <div>{event.isPrivate.valueOf()}</div>} */}

            <div className={classes.eventsList}>
                Events:
                {event.events_id.map((eventId: any) => (
                    <div key={eventId}>
                        <p>{eventData?.events.find((event: any) => event._id === eventId).tripName}</p>
                        <button onClick={() => handleDeleteEvent(eventId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Trip };
