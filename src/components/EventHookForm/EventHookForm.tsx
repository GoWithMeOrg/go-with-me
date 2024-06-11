"use client";

import { useRouter } from "next/navigation";
import { TitleField } from "../TitleField";
import classes from "./EventHookForm.module.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { EventType } from "../EventForm";
import { EventStatus } from "../EventStatus";
import { Button } from "../Button";
import { Date } from "@/components/Date";
import { Time } from "@/components/Time";
import { Description } from "../Description";

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
    status: "public" | "private | invation";
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

    enum Status {
        PUBLIC = "public",
        INVATION = "invation",
        PRIVATE = "private",
    }

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue="defaultValue"
                    render={({ field }) => <TitleField {...field} />}
                    rules={{ required: true }}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => <EventStatus options={Status} selected={field.value} {...field} />}
                />

                <Controller
                    name="description"
                    control={control}
                    defaultValue="Description"
                    render={({ field }) => <Description {...field} />}
                    rules={{ required: true }}
                />

                <div className={classes.inputsDate}>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => <Date title={"Start date"} {...field} />}
                    />
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => <Date title={"Finish date"} {...field} />}
                    />
                    <Controller name="time" control={control} render={({ field }) => <Time {...field} />} />
                </div>

                <Button className={classes.buttonSaveChange} type="submit" text={"Save changes"} />
            </form>
        </div>
    );
};

export default EventHookForm;
