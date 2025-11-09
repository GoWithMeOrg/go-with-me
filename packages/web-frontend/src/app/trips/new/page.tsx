"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";

import { TripForm } from "@/components/widgets/TripForm";
import { TripType } from "@/components/widgets/TripForm/TripForm";

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

    const handleCreateTrip = async (trip: TripType) => {
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
                    tripData={{
                        organizer_id: organizerId,
                        name: "",
                        description: "",
                        startDate: new Date(),
                        endDate: new Date(),
                        isPrivate: true,
                    }}
                    onSubmit={handleCreateTrip}
                />
            </div>
        </div>
    );
};

export default TripNewPage;
