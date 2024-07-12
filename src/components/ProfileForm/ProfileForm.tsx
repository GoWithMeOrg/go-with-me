"use client";

import { TitleField } from "../TitleField";
import classes from "./ProfileForm.module.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { gql, useMutation } from "@apollo/client";
import { EventType } from "../OldEventForm";
import { Button } from "../Button";
import { Description } from "../Description";
import { SelectCategory } from "../SelectCategory";
import { eventCategory, eventTypes } from "../Dropdown/dropdownLists";
import { CreateTag } from "../CreateTag";
import { UploadFile } from "../UploadFile";
import { IUser } from "@/database/models/User";
import Link from "next/link";

export type ProfileType = Partial<IUser>;

interface IFormProfile {
    _id: string;
    firstName: string;
    LastName: string;
    mail: string;
    location: string;
    aboutMe: string;
    image: string;
    categories: string[];
    types: string[];
    tags: string[];
}

interface IEventFormProps {
    profileData?: ProfileType;
    onSubmitEvent?: (event: ProfileType) => void;
}
export const ProfileForm = ({ profileData, onSubmitEvent }: IEventFormProps) => {
    const { control, handleSubmit, watch } = useForm<IFormProfile>();

    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        //onSubmitEvent(event);
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.formWrapper}>
                    <div className={classes.formField}>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <UploadFile
                                    //imageUrl={eventData.image}
                                    onChange={field.onChange}
                                    width={180}
                                    height={180}
                                    className={classes.preview}
                                />
                            )}
                        />

                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => <TitleField title={"First name"} />}
                            rules={{ required: true }}
                        />

                        <Controller
                            name="LastName"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => <TitleField title={"Last name"} />}
                            rules={{ required: true }}
                        />

                        <Controller
                            name="location"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => <TitleField title={"Location"} />}
                            rules={{ required: true }}
                        />

                        <Controller
                            name="aboutMe"
                            control={control}
                            defaultValue={""}
                            render={({ field }) => <Description title={"About me"} />}
                        />

                        <Controller
                            name="categories"
                            control={control}
                            render={({ field }) => (
                                <SelectCategory
                                    categoryList={eventCategory}
                                    eventCategories={[]}
                                    titleCategories={"What categories are you interested in?"}
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
                                    titleCategories={"What subjects are you interested in?"}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => <CreateTag onChange={field.onChange} eventTags={[]} />}
                        />
                    </div>

                    <div className={classes.list}>
                        <div className={classes.buttonsCreate}>
                            <Button className={classes.buttonCreate}>
                                <Link className={classes.buttonCreateLink} href="/events/new">
                                    Create event
                                </Link>
                            </Button>
                            <Button className={classes.buttonCreate}>
                                <Link className={classes.buttonCreateLink} href="/trips/new">
                                    Create trip
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <Button className={classes.buttonSaveChange} type="submit" text={"Save changes"} />
            </form>
        </div>
    );
};

export default ProfileForm;
