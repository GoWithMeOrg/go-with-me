"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import { useSession } from "next-auth/react";

import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";

const CREATE_TRIP = gql`
    mutation CreateTrip($trip: TripInput) {
        createTrip(trip: $trip) {
            _id
            organizer_id
            organizer {
                _id
                name
                email
                image
            }
            tripName
            description
            events_id
            startDate
            endDate
        }
    }
`;

const TripNewPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [createTrip] = useMutation(CREATE_TRIP);
    const organizerId = (session?.user as { id: string })?.id;

    console.log(organizerId);

    const handleCreateEvent = async (trip: EventType) => {
        createTrip({
            variables: {
                trip: { ...trip, organizer_id: organizerId },
            },
        }).then((response) => {
            console.log(response);
            router.push(`/trips/${response.data?.createTrip?._id}`);
            // console.log(response.data);
        });
    };

    return (
        <div className="EventNewPage">
            <h1>Trip New Page</h1>
            <div>
                <EventForm
                    event={{
                        // @ts-ignore TODO: fix type
                        organizer_id: organizerId,
                        tripName: "",
                        description: "",
                        startDate: new Date(),
                        endDate: new Date(),
                        isPrivate: true,
                        locationName: "",
                    }}
                    onSubmit={handleCreateEvent}
                />
            </div>
        </div>
    );
};

export default TripNewPage;
