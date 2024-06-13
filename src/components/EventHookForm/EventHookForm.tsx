"use client";

import { useRouter } from "next/navigation";
import { TitleField } from "../TitleField";
import classes from "./EventHookForm.module.css";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { EventType } from "../EventForm";
import { EventStatus } from "../EventStatus";
import { Button } from "../Button";
import { Date } from "@/components/Date";
import { Time } from "@/components/Time";
import { Description } from "../Description";
import { SelectCategory } from "../SelectCategory";
import { eventCategory, eventTypes } from "../Dropdown/dropdownLists";
import { CreateTag } from "../CreateTag";

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
    const { control, handleSubmit, watch, register } = useForm<IFormInputs>();

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

    const watchCategories = watch("tags");
    console.log(watchCategories);

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.formWrapper}>
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

                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <SelectCategory
                                categoryList={eventCategory}
                                eventCategories={[]}
                                titleCategories={"Select category"}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        name="types"
                        control={control}
                        render={({ field }) => (
                            <SelectCategory
                                categoryList={eventTypes}
                                eventCategories={[]}
                                titleCategories={"Select category"}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => <CreateTag onChange={field.onChange} eventTags={[]} />}
                    />

                    <Button className={classes.buttonSaveChange} type="submit" text={"Save changes"} />
                </div>
            </form>
        </div>
    );
};

export default EventHookForm;
