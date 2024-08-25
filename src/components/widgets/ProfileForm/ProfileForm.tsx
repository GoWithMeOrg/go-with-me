"use client";

import React, { FC } from "react";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { IUser } from "@/database/models/User";

import { CreateTag } from "@/components/widgets/CreateTag";
import { UploadFile } from "@/components/widgets/UploadFile";

import { Button } from "@/components/shared/Button";
import { Description } from "@/components/shared/Description";
import { TitleField } from "@/components/shared/TitleField";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { SelectCategory } from "@/components/widgets/SelectCategory";

import classes from "./ProfileForm.module.css";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";

export type ProfileType = Partial<IUser>;

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        user(id: $userId) {
            _id
            name
            email
            image
            location
            aboutMe
            interests
            meetings
            tags
        }
    }
`;
interface IFormProfile {
    _id: string;
    firstName: string;
    lastName: string;
    mail: string;
    location: string;
    aboutMe: string;
    image: string;
    categories: string[];
    types: string[];
    tags: string[];
}

interface IProfileFormProps {
    profileData?: ProfileType;
    onSubmitEvent?: (event: ProfileType) => void;
    userId: string;
}
export const ProfileForm: FC<IProfileFormProps> = ({ profileData, onSubmitEvent }) => {
    const { control, handleSubmit, watch } = useForm<IFormProfile>();
    //const { data: usersData } = useQuery(GET_USERS);
    const { data: session } = useSession();
    //@ts-ignore
    const userId = session?.user?.id;
    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: userId } });

    //console.log(userData?.user);
    const fullName = userData?.user?.name || "";
    const [firstName, lastName] = fullName.split(" ");

    // /console.log(userData?.user?.image);
    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        //onSubmitEvent(event);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <div className={classes.formField}>
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                        <UploadFile
                            imageUrl={userData?.user?.image}
                            onChange={field.onChange}
                            width={180}
                            height={180}
                            className={classes.preview}
                            flexDirection={"revert-layer"}
                        />
                    )}
                />

                <Controller
                    name="firstName"
                    control={control}
                    defaultValue={firstName}
                    render={({ field }) => <TitleField defaultValue={firstName} title={"First name"} />}
                    rules={{ required: true }}
                />

                <Controller
                    name="lastName"
                    control={control}
                    defaultValue={lastName}
                    render={({ field }) => <TitleField defaultValue={lastName} title={"Last name"} />}
                    rules={{ required: true }}
                />

                <Controller
                    name="mail"
                    control={control}
                    defaultValue={userData?.user?.email}
                    render={({ field }) => (
                        <Label label={"Email"}>
                            <Input defaultValue={userData?.user?.email} onChange={field.onChange} />
                        </Label>
                    )}
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

            <Button className={classes.buttonSaveChange} type="submit" text={"Save changes"} />
        </form>
    );
};

export default ProfileForm;
