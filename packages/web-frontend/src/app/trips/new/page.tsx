'use client';

import { TripForm } from '@/components/widgets/TripForm';
import { TripType } from '@/components/widgets/TripForm/TripForm';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CREATE_TRIP = gql`
    mutation CreateTrip($trip: TripInput) {
        createTrip(trip: $trip) {
            _id
        }
    }
`;

const TripNewPage: NextPage = () => {
    const router = useRouter();
    const dataSession = useSession();
    const [createTrip] = useMutation(CREATE_TRIP);
    //@ts-ignore
    const organizerId = (dataSession?.data?.session?.user as { id: string })?.id;

    const handleCreateTrip = async (trip: TripType) => {
        createTrip({
            variables: {
                trip: { ...trip, organizer_id: organizerId },
            },
        }).then((response) => {
            // Safely access createTrip with fallback for type error
            const createTripData = (response.data as { createTrip?: { _id: string } })?.createTrip;
            if (createTripData && createTripData._id) {
                router.push(`/trips/${createTripData._id}`);
            }
        });
    };

    return (
        <div className="TripNewPage">
            <h1>Trip New Page</h1>
            <div>
                <TripForm
                    tripData={{
                        organizer_id: organizerId,
                        name: '',
                        description: '',
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
