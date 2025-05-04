"use client";

import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { CreateTag } from "@/components/widgets/CreateTag";
import { UploadFile } from "@/components/widgets/UploadFile";
import { SelectItems } from "@/components/widgets/SelectItems";
import { UploadFileSizes } from "@/components/widgets/UploadFile/UploadFile";
import { Autocomplete } from "@/components/widgets/GoogleMap";
import { optionsFullAdress } from "@/components/widgets/GoogleMap/OptionsAutocomplete";

import { Button } from "@/components/shared/Button";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";
import { ButtonLink } from "@/components/shared/ButtonLink";

import { useProfileForm } from "./hooks/useProfileForm";

import classes from "./ProfileForm.module.css";

export const ProfileForm: FC = () => {
    const { error, userData, handleSubmit, onSubmit, control, handleUploadedFile, user_id } = useProfileForm();

    return (
        <>
            {!error && userData?.user && (
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
                                    <Input
                                        defaultValue={userData?.user?.name.split(" ")[0]}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <Label label={"Last Name"}>
                                    <Input
                                        defaultValue={userData?.user?.name.split(" ")[1]}
                                        onChange={field.onChange}
                                    />
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
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Label label={"Обо мне"}>
                                    <Textarea
                                        defaultValue={userData?.user?.description}
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

                        <Controller
                            name="types"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={eventTypes}
                                    eventCategories={[...(userData?.user?.types ?? [])]}
                                    titleCategories={"What subjects are you interested in?"}
                                    badgesShow
                                    onChange={field.onChange}
                                    filter={false}
                                />
                            )}
                        />

                        <Controller
                            name="tags"
                            control={control}
                            render={({ field }) => (
                                <CreateTag
                                    onChange={field.onChange}
                                    eventTags={[...(userData?.user?.tags ?? [])]}
                                    title={"Добавить тег"}
                                />
                            )}
                        />
                    </div>

                    <div className={classes.buttons}>
                        <Button size="big" type="submit" className={classes.saveChanges}>
                            Save changes
                        </Button>
                        <ButtonLink href={`/profile/${user_id}/public`} text={"View profile"} width="10.38rem" />
                    </div>
                </form>
            )}
        </>
    );
};

export default ProfileForm;
