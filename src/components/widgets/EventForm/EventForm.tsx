"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { TitleField } from "@/components/shared/TitleField";
import { EventStatus } from "@/components/widgets/EventStatus";
import { Button } from "@/components/shared/Button";
import { Date } from "@/components/widgets/Date";
import { Time } from "@/components/widgets/Time";
import { Description } from "@/components/shared/Description";
import { SelectCategory } from "@/components/widgets/SelectCategory";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { CreateTag } from "@/components/widgets/CreateTag";
import { GuestList } from "@/components/widgets/GuestList";
import { UploadFile } from "@/components/widgets/UploadFile";
import { Location } from "@/components/widgets/Location";
import { IEvent } from "@/database/models/Event";

import classes from "./EventForm.module.css";

export type EventType = Partial<IEvent>;

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

    //console.log(eventData.name);

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.formWrapper}>
                    <div className={classes.formField}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TitleField
                                    title={"Event title"}
                                    defaultValue={eventData.name || ""}
                                    onChange={field.onChange}
                                />
                            )}
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
                            render={({ field }) => (
                                <Description
                                    title={"Description"}
                                    defaultValue={eventData.description || ""}
                                    onChange={field.onChange}
                                />
                            )}
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
                        render={({ field }) => (
                            <UploadFile
                                imageUrl={eventData.image}
                                className={classes.preview}
                                width={460}
                                height={324}
                                onChange={field.onChange}
                                flexDirection={"column"}
                            />
                        )}
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
