"use client";

import { useRouter } from "next/navigation";
import { TitleField } from "../TitleField";
import classes from "./EventHookForm.module.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { EventType } from "../EventForm";

const CREATE_EVENT = gql`
    mutation CreateEvent($event: EventInput!) {
        createEvent(event: $event) {
            _id
        }
    }
`;

interface IFormInputs {
    organizer_id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    time: string;
    location: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    image: string;
    status: string;
    categories: string[];
    types: string[];
    tags: string[];
}
export const EventHookForm = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [createEvent] = useMutation(CREATE_EVENT);
    const organizerId = (session?.user as { id: string })?.id;
    const { control, handleSubmit } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = (event: EventType) => {
        createEvent({
            variables: {
                event: { ...event, organizer_id: organizerId },
            },
        }).then((response) => {
            router.push(`/events/${response.data?.createEvent?._id}`);
        });

        console.log(event);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                defaultValue="defaultValue"
                render={({ field }) => <TitleField {...field} />}
                rules={{ required: true }}
            />

            <button type="submit">Сохранить</button>
        </form>
    );
};

export default EventHookForm;
