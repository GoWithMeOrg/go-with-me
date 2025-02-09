"use client";

import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { IUser } from "@/database/types/User";

import { CreateTag } from "@/components/widgets/CreateTag";
import { UploadFile } from "@/components/widgets/UploadFile";

import { Button } from "@/components/shared/Button";
import { Description } from "@/components/shared/Description";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { SelectItems } from "@/components/widgets/SelectItems";

import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";

import { UploadFileSizes } from "@/components/widgets/UploadFile/UploadFile";

import { useUploadFile } from "@/components/widgets/UploadFile/hooks";
import classes from "./ProfileForm.module.css";

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
    const [file, setFile] = useState<File | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);
    const { onSubmitFile } = useUploadFile({});
    //@ts-ignore
    const userId = session?.user?.id;
    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: userId } });

    //console.log(userData?.user);
    const fullName = userData?.user?.name || "";
    const [firstName, lastName] = fullName.split(" ");

    // /console.log(userData?.user?.image);
    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        //onSubmitEvent(event);
        // if (file && presignUrl) {
        //     onSubmitFile(file, presignUrl);
        // }
    };

    const handleUploadedFile = (file: File, preUrl: string, onSubmitFile: (file: File, preUrl: string) => void) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

    console.log(session);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <div className={classes.formField}>
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                        <UploadFile
                            imageUrl={userData?.user?.image}
                            width={180}
                            height={180}
                            sizeType={UploadFileSizes.profile}
                            onUploadedFile={handleUploadedFile}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="firstName"
                    control={control}
                    defaultValue={firstName}
                    render={({ field }) => (
                        <Label label={"First Name"}>
                            <Input defaultValue={firstName} onChange={field.onChange} />
                        </Label>
                    )}
                    rules={{ required: true }}
                />

                <Controller
                    name="lastName"
                    control={control}
                    defaultValue={lastName}
                    render={({ field }) => (
                        <Label label={"Last Name"}>
                            <Input defaultValue={lastName} onChange={field.onChange} />
                        </Label>
                    )}
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
                    render={({ field }) => (
                        <Label label={"Location"}>
                            <Input defaultValue={lastName} />
                        </Label>
                    )}
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
                        <SelectItems
                            categoryList={eventCategory}
                            eventCategories={[]}
                            titleCategories={"What categories are you interested in?"}
                            badgesShow
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="types"
                    control={control}
                    render={({ field }) => (
                        <SelectItems
                            categoryList={eventTypes}
                            eventCategories={[]}
                            titleCategories={"What subjects are you interested in?"}
                            badgesShow
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

            <Button className={classes.buttonSaveChange} size="big" type="submit">
                Save changes
            </Button>
        </form>
    );
};

export default ProfileForm;
