"use client";
// It can be a server-side rendered page
// take a look how to pass sessions to the page in `src/app/events/page.tsx`

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, gql } from "@apollo/client";

import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";

const CREATE_EVENT = gql`
    mutation CreateEvent($event: EventInput!) {
        createEvent(event: $event) {
            _id
        }
    }
`;

const EventNewPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [createEvent] = useMutation(CREATE_EVENT);
    const organizerId = (session?.user as { id: string })?.id;

    const handleCreateEvent = async (event: EventType) => {
        createEvent({
            variables: {
                event: { ...event, organizer_id: organizerId },
            },
        }).then((response) => {
            router.push(`/events/${response.data?.createEvent?._id}`);
        });
    };

    return (
        <div className="EventNewPage">
            <h1>Event New Page</h1>
            <div>
                <EventForm
                    eventData={{
                        organizer_id: organizerId,
                        name: "",
                        description: "",
                        startDate: new Date(),
                        endDate: new Date(),
                        isPrivate: true,
                    }}
                    onSubmit={handleCreateEvent}
                />
            </div>
        </div>
    );
};

export default EventNewPage;
