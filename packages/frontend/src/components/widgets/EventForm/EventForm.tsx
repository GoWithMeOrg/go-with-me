'use client';

import { FC, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Privacy } from '@/app/graphql/types';
import { Button } from '@/components/shared/Button';
import { categoriesList, interestsList } from '@/components/shared/Dropdown/dropdownLists';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared/Label';
import { Textarea } from '@/components/shared/Textarea';
import { CreateTag } from '@/components/widgets/CreateTag';
import { Date } from '@/components/widgets/Date';
import { EventFormProps } from '@/components/widgets/EventForm/eventForm.interfaces';
import { useEventForm } from '@/components/widgets/EventForm/hooks/useEventForm';
import { LocationPicker } from '@/components/widgets/LocationPicker';
import { PrivacySelector } from '@/components/widgets/PrivacySelector';
import { SelectItems } from '@/components/widgets/SelectItems';
import { Time } from '@/components/widgets/Time';
import { UploadFile } from '@/components/widgets/UploadFile';
import { UploadFileSizes } from '@/components/widgets/UploadFile/types/storage-folder';

import classes from './EventForm.module.css';

export const EventForm: FC<EventFormProps> = ({ eventData }) => {
    const submitFileRef = useRef<(() => Promise<void>) | null>(null);
    const deleteFileRef = useRef<((url: string) => Promise<void>) | null>(null);

    const { control, handleSubmit, onSubmit } = useEventForm({
        eventData,
        submitFileRef,
        deleteFileRef,
    });

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.formWrapper}>
                    <div className={classes.formField}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Label label={'Название'}>
                                    <Input
                                        {...field}
                                        defaultValue={eventData?.name as string}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="location"
                            control={control}
                            defaultValue={eventData?.location}
                            render={({ field }) => (
                                <LocationPicker
                                    locationEvent={eventData?.location}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name="privacy"
                            control={control}
                            defaultValue={eventData?.privacy || Privacy.Public}
                            render={({ field }) => (
                                <PrivacySelector
                                    options={Privacy}
                                    selected={field.value}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Label label={'Описание'}>
                                    <Textarea
                                        defaultValue={eventData?.description as string}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <div className={classes.inputsDate}>
                            <Controller
                                name="startDate"
                                control={control}
                                defaultValue={eventData?.startDate}
                                render={({ field }) => (
                                    <Date title={'Начало'} date={eventData?.startDate} {...field} />
                                )}
                            />
                            <Controller
                                name="endDate"
                                control={control}
                                defaultValue={eventData?.endDate}
                                render={({ field }) => (
                                    <Date
                                        title={'Завершение'}
                                        date={eventData?.endDate}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="time"
                                control={control}
                                defaultValue={eventData?.time as string}
                                render={({ field }) => <Time time={eventData?.time} {...field} />}
                            />
                        </div>

                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={categoriesList}
                                    eventCategories={[...(eventData?.category?.categories ?? [])]}
                                    titleCategories={'Выбрать категорию'}
                                    badgesShow
                                    onChange={field.onChange}
                                    filter={false}
                                />
                            )}
                        />

                        <Controller
                            name="interest"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={interestsList}
                                    eventCategories={[...(eventData?.interest?.interests ?? [])]}
                                    titleCategories={'Выбрать тип'}
                                    badgesShow
                                    onChange={field.onChange}
                                    filter={false}
                                />
                            )}
                        />

                        <Controller
                            name="tag"
                            control={control}
                            defaultValue={eventData?.tag?.tags}
                            render={({ field }) => (
                                <CreateTag
                                    onChange={field.onChange}
                                    eventTags={field.value || []}
                                    title={'Создать тег'}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="image"
                        control={control}
                        defaultValue={eventData?.image}
                        render={({ field }) => (
                            <UploadFile
                                folder="users/events"
                                imageUrl={eventData?.image}
                                width={460}
                                height={324}
                                sizeType={UploadFileSizes.event}
                                onChange={field.onChange}
                                onUploadedFile={(submit, deleteFile) => {
                                    submitFileRef.current = submit;
                                    deleteFileRef.current = deleteFile;
                                }}
                            />
                        )}
                    />
                </div>

                <Button size="big" type="submit">
                    {eventData ? 'Сохранить' : 'Создать'}
                </Button>
            </form>
        </div>
    );
};
