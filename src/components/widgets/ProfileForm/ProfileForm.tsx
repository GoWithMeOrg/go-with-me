"use client";

import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { gql, useMutation, useQuery } from "@apollo/client";
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

import { useParams, useRouter } from "next/navigation";

import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { UPDATE_USER } from "@/app/api/graphql/mutations/user";

import classes from "./ProfileForm.module.css";
import { Textarea } from "@/components/shared/Textarea";
import { Location } from "@/components/widgets/Location";
import { Autocomplete } from "../GoogleMap";
import { optionsFullAdress } from "../GoogleMap/OptionsAutocomplete";

export type ProfileType = Partial<IUser>;
interface IFormProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    location: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    aboutMe: string;
    image: string;
    categories: string[];
    types: string[];
    tags: string[];
}

export const ProfileForm: FC = () => {
    const { control, handleSubmit, watch } = useForm<IFormProfile>();
    const { data: session } = useSession();
    const [file, setFile] = useState<File | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);
    const { onSubmitFile, getDeleteFile } = useUploadFile({});
    const user_id = session?.user?.id;
    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: user_id } });
    const [updateUser] = useMutation(UPDATE_USER);
    const router = useRouter();

    const fullName = userData?.user?.name || "";
    const [firstName, lastName] = fullName.split(" ");

    const place = watch("location");

    function mapGooglePlaceToLocationInput(place: any) {
        if (!place || !place.geometry) return null;

        return {
            type: "Point",
            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            properties: {
                address: place.formatted_address,
            },
        };
    }

    const handleEditProfile = (userEdited: Partial<IUser>) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);
        updateUser({
            variables: {
                updateUserId: user_id,
                user: { ...userEdited, location: transformedLocation },
            },
        }).then((response) => {
            console.log("UserEditPage: ", response); // eslint-disable-line
            router.push(`/profile/${user_id}/public`);
        });
        refetch();
    };

    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        handleEditProfile(event);
        if (file && presignUrl) {
            onSubmitFile(file, presignUrl);
            if (userData.image && file) {
                getDeleteFile(userData.image);
            }
        }
    };

    const handleUploadedFile = (file: File, preUrl: string) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

    console.log(userData);
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
                    render={({ field }) => (
                        <Label label={"First Name"}>
                            <Input defaultValue={firstName || ""} onChange={field.onChange} />
                        </Label>
                    )}
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
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue={userData?.user?.email}
                    render={({ field }) => (
                        <Label label={"Email"}>
                            <Input defaultValue={userData?.user?.email} onChange={field.onChange} />
                        </Label>
                    )}
                />

                <Controller
                    name="location"
                    control={control}
                    defaultValue={userData?.user?.location}
                    render={({ field }) => (
                        <Label label={"Локация"}>
                            <Autocomplete
                                className={classes.location}
                                onPlaceSelect={field.onChange}
                                address={userData?.user?.location.properties.address}
                                options={optionsFullAdress}
                            />
                        </Label>
                    )}
                />

                <Controller
                    name="aboutMe"
                    control={control}
                    render={({ field }) => (
                        <Label label={"Обо мне"}>
                            <Textarea
                                defaultValue={userData?.user?.aboutMe || ""}
                                onChange={field.onChange}
                                resizeNone
                            />
                        </Label>
                    )}
                />

                <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                        <SelectItems
                            categoryList={eventCategory}
                            eventCategories={[...(userData?.user?.categories ?? [])]}
                            titleCategories={"Выбрать категорию"}
                            badgesShow
                            onChange={field.onChange}
                            filter={false}
                        />
                    )}
                />

                {/* <Controller
                    name="types"
                    control={control}
                    render={({ field }) => (
                        <SelectItems
                            categoryList={eventTypes}
                            eventCategories={[]}
                            titleCategories={"What subjects are you interested in?"}
                            badgesShow
                            onChange={field.onChange}
                            filter={false}
                        />
                    )}
                /> */}

                {/* <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <CreateTag onChange={field.onChange} eventTags={[]} title={"Добавить тег"} />
                    )}
                /> */}
            </div>

            <Button className={classes.buttonSaveChange} size="big" type="submit">
                Save changes
            </Button>
        </form>
    );
};

export default ProfileForm;
