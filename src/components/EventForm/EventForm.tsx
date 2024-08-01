"use client";

import { useRouter } from "next/navigation";
import { TitleField } from "../TitleField";
import classes from "./EventForm.module.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { EventType } from "../OldEventForm";
import { EventStatus } from "../EventStatus";
import { Button } from "../Button";
import { Date } from "@/components/Date";
import { Time } from "@/components/Time";
import { Description } from "../Description";
import { SelectCategory } from "../SelectCategory";
import { eventCategory, eventTypes } from "../Dropdown/dropdownLists";
import { CreateTag } from "../CreateTag";
import { GuestList } from "../GuestList";
import { UploadFile } from "../UploadFile";
import { Location } from "../Location";

export enum Status {
    PUBLIC = "public",
    INVATION = "invation",
    PRIVATE = "private",
}

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
    status: Status;
    categories: string[];
    types: string[];
    tags: string[];
}

interface IEventFormProps {
    eventData: EventType;
    onSubmitEvent: (event: EventType) => void;
}
export const EventForm = ({ eventData, onSubmitEvent }: IEventFormProps) => {
    const { control, handleSubmit, watch } = useForm<IFormInputs>();

    const onSubmit: SubmitHandler<IFormInputs> = (event: EventType) => {
        onSubmitEvent(event);
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.formWrapper}>
                    <div className={classes.formField}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={eventData.name || ""}
                            render={({ field }) => <TitleField {...field} />}
                            rules={{ required: true }}
                        />

                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <Location locationEvent={eventData?.location as any} onChange={field.onChange} />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            defaultValue={(eventData.status || Status.PUBLIC) as Status}
                            render={({ field }) => <EventStatus options={Status} selected={field.value} {...field} />}
                        />

                        <Controller
                            name="description"
                            control={control}
                            defaultValue={eventData.description || ""}
                            render={({ field }) => <Description {...field} />}
                        />

                        <div className={classes.inputsDate}>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <Date title={"Start date"} date={eventData.startDate} {...field} />
                                )}
                            />
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <Date title={"Finish date"} date={eventData.endDate} {...field} />
                                )}
                            />
                            <Controller
                                name="time"
                                control={control}
                                render={({ field }) => <Time time={eventData.time} {...field} />}
                            />
                        </div>

                        <Controller
                            name="categories"
                            control={control}
                            render={({ field }) => (
                                <SelectCategory
                                    categoryList={eventCategory}
                                    eventCategories={eventData.categories || []}
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
                                    eventCategories={eventData.types || []}
                                    titleCategories={"Select subject"}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <CreateTag onChange={field.onChange} eventTags={eventData.tags || []} />
                            )}
                        />
                    </div>

                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => <UploadFile imageUrl={eventData.image} onChange={field.onChange} />}
                    />
                </div>

                <GuestList />

                <Button
                    className={classes.buttonSaveChange}
                    type="submit"
                    text={"Save changes"}
                    resetDefaultStyles={true}
                />
            </form>
        </div>
    );
};

export default EventForm;
