import { FC, FormEvent } from "react";
import type { IEvent } from "@/database/models/Event";
import classes from "./EventForm.module.css";
import { UploadFile } from "../UploadFile";
import { TitleField } from "../TitleField";
import { Location } from "../Location";
import { Date } from "../Date";
import Time from "../Time/Time";
import { EventStatus } from "@/components/EventStatus";
import { Button } from "../Button";
import { Description } from "../Description";
import { SelectCategory } from "../SelectCategory";
import { CreateTag } from "../CreateTag";
import { GuestList } from "../GuestList";
import { eventCategory, eventTypes } from "../Dropdown/dropdownLists";

export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

export const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    let eventName: string,
        address: string,
        coordinates: { lat: number; lng: number } | null,
        startDate: string,
        finishDate: string,
        startTime: string,
        description: string,
        eventStatus: string,
        selectedCategories: string[],
        selectedTypes: string[],
        selectedTags: string[],
        imageUrl: string;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => (eventName = e.target.value);
    const handlePlaceChange = (selectedPlace: google.maps.places.PlaceResult | null) => {
        const newAddress = selectedPlace?.formatted_address;
        if (newAddress !== address) address = newAddress ?? "";

        const newCoord = {
            lat: selectedPlace?.geometry?.location?.lat() as number,
            lng: selectedPlace?.geometry?.location?.lng() as number,
        };

        if (newCoord.lat !== coordinates?.lat || newCoord.lng !== coordinates?.lng) coordinates = newCoord;
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => (startDate = e.target.value);
    const handleFinishDateChange = (e: React.ChangeEvent<HTMLInputElement>) => (finishDate = e.target.value);
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => (startTime = e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => (description = e.target.value);
    const handleStatusChange = (status: string) => (eventStatus = status);
    const handleCategoriesChange = (categories: string[]) => (selectedCategories = categories);
    const handleTypesChange = (types: string[]) => (selectedTypes = types);
    const handleTagsChange = (tags: string[]) => (selectedTags = tags);
    const handleImageUrl = (selectedImageUrl: string) => (imageUrl = selectedImageUrl);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        const onSubmitData: Partial<IEvent> = {
            organizer_id: eventData.organizer?._id,
            name: eventName,
            description: description,
            startDate: startDate,
            endDate: finishDate,
            time: startTime,
            location: {
                type: "Point",
                coordinates: [coordinates?.lat ?? 0, coordinates?.lng ?? 0],
                properties: {
                    address: address,
                },
            },
            image: imageUrl,
            status: eventStatus,
            categories: selectedCategories,
            types: selectedTypes,
            tags: selectedTags,
        };
        onSubmit(onSubmitData);
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.formWrapper}>
                    {/* <TitleField defaultValue={eventData.name} onTitleChange={handleTitleChange} /> */}
                    <Location
                        onPlaceChange={handlePlaceChange}
                        address={eventData.location?.properties?.address}
                        coord={
                            eventData.location?.coordinates
                                ? { lat: eventData.location.coordinates[0], lng: eventData.location.coordinates[1] }
                                : null
                        }
                    />
                    <div className={classes.inputsDate}>
                        {/* <Date date={eventData.startDate} title={"Start date"} onDateChange={handleStartDateChange} />
                        <Date date={eventData.endDate} title={"Finish Date"} onDateChange={handleFinishDateChange} />
                        <Time time={eventData.time} onTimeChange={handleTimeChange} /> */}
                    </div>
                    {/* <EventStatus status={eventData.status} onStatusChange={handleStatusChange} /> */}
                    {/* <Description text={eventData.description} onDescriptionChange={handleDescriptionChange} /> */}
                    {/* <SelectCategory
                        categoryList={eventCategory}
                        //onCategoriesChange={handleCategoriesChange}
                        eventCategories={eventData.categories ?? []}
                        titleCategories={"Select category"}
                    /> */}
                    {/* <SelectCategory
                        categoryList={eventTypes}
                        //onCategoriesChange={handleTypesChange}
                        eventCategories={eventData.types ?? []}
                        titleCategories={"Select subject"}
                    /> */}
                    {/* <CreateTag onTagsChange={handleTagsChange} eventTags={eventData.tags ?? []} /> */}
                    <GuestList />
                    <Button className={classes.buttonSaveChange} type="submit" text={"Save changes"} />
                </div>
            </form>

            <UploadFile onImageUrl={handleImageUrl} imageUrl={eventData.image} />
        </div>
    );
};

export default EventForm;
