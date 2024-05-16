import { FC, FormEvent, useState } from "react";
import dayjs from "dayjs";
import type { IEvent } from "@/database/models/Event";
import classes from "./EventForm.module.css";
import { UploadFile } from "../UploadFile";
import { TitleField } from "../TitleField";
import { LocationField } from "../LocationField";
import { Date } from "../Date";
import Time from "../Time/Time";
import { Confidentiality } from "../Confidentiality";
import { Button } from "../Button";
import { Description } from "../Description";
import { SelectCategory } from "../SelectCategory";
import { CreateTag } from "../CreateTag";
import { GuestList } from "../GuestList";

export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

export const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (selectedImage: any) => {
        setImage(selectedImage);
    };

    const handleImageUrl = (selectedImageUrl: any) => {
        setImageUrl(selectedImageUrl);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        const onSubmitData: Partial<IEvent> = {
            organizer_id: eventData.organizer?._id,
            name: formData.name as string,
            description: formData.description as string,
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
            time: (formData.time as string) ?? eventData.time,
            location: {
                type: "Point",
                coordinates: [
                    //eventData.location?.coordinates[0] ??
                    selectedPlace?.geometry?.location?.lng() ?? 0,
                    //eventData.location?.coordinates[1] ??
                    selectedPlace?.geometry?.location?.lat() ?? 0,
                ],
                properties: {
                    address: selectedPlace?.formatted_address ?? "",
                },
            },
            image: imageUrl ?? eventData.image,
            status: (formData.status as string) ?? eventData.status,
            //categories: categories,
            //tags: tags,
        };
        onSubmit(onSubmitData);
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.formWrapper}>
                    <TitleField name={eventData.name} />
                    <LocationField address={eventData.location?.properties?.address} />
                    <div className={classes.inputsDate}>
                        <Date date={eventData.startDate} title={"Start date"} />
                        <Date date={eventData.endDate} title={"Finish Date"} />
                        <Time time={eventData.time} />
                    </div>
                    <Confidentiality status={eventData.status} />
                    <Description text={eventData.description} />
                    <SelectCategory eventCategories={eventData.categories ?? []} titleCategories={"Select category"} />
                    <SelectCategory eventCategories={eventData.categories ?? []} titleCategories={"Select subject"} />
                    <CreateTag tagsEvent={eventData.tags ?? []} />
                    <GuestList />
                    <Button className={classes.buttonSaveChange} type="submit" text={"Save changes"} />
                </div>
            </form>

            <UploadFile onImageChange={handleImageChange} onImageUrl={handleImageUrl} imageUrl={eventData.image} />
        </div>
    );
};

export default EventForm;
