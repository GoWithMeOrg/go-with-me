"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, gql } from "@apollo/client";

import { TripForm } from "@/components/TripForm";
import { ITrip } from "@/database/models/Trip";

const CREATE_TRIP = gql`
    mutation CreateTrip($trip: TripInput) {
        createTrip(trip: $trip) {
            _id
        }
    }
`;

const TripNewPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [createTrip] = useMutation(CREATE_TRIP);
    const organizerId = (session?.user as { id: string })?.id;

    const handleCreateEvent = async (trip: ITrip) => {
        createTrip({
            variables: {
                trip: { ...trip, organizer_id: organizerId },
            },
        }).then((response) => {
            router.push(`/trips/${response.data?.createTrip?._id}`);
        });
    };

    return (
        <div className="TripNewPage">
            <h1>Trip New Page</h1>
            <div>
                <TripForm
                    // tripData={{
                    //     name: "",
                    //     description: "",
                    //     isPrivate: true,
                    //     organizer_id: organizerId,
                    //     startDate: new Date(),
                    //     endDate: new Date(),
                    // }}
                    tripData={{
                        _id: "",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        organizer: {
                            _id: "",
                            name: "",
                            email: "",
                            image: "",
                            emailVerified: false,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                        events: [],
                        name: "",
                        description: "",
                        isPrivate: true,
                        organizer_id: organizerId,
                        startDate: new Date(),
                        endDate: new Date(),
                    }}
                    onSubmit={handleCreateEvent}
                />
            </div>
        </div>
    );
};

export default TripNewPage;
