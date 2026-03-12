'use client';

import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Event, Privacy } from '@/app/graphql/types';
import { Button } from '@/components/shared/Button';
import { categoriesList, interestsList } from '@/components/shared/Dropdown/dropdownLists';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared/Label';
import { Textarea } from '@/components/shared/Textarea';
import { CreateTag } from '@/components/widgets/CreateTag';
import { Date } from '@/components/widgets/Date';
import { LocationPicker } from '@/components/widgets/LocationPicker';
import { PrivacySelector } from '@/components/widgets/PrivacySelector';
import { SelectItems } from '@/components/widgets/SelectItems';
import { Time } from '@/components/widgets/Time';
import { UploadFile } from '@/components/widgets/UploadFile';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';

import { UploadFileSizes } from '../UploadFile/types/storage-folder';
import { useEventForm } from './hooks/useEventForm';

import classes from './EventForm.module.css';

export type EventType = Partial<Event>;

interface IEventFormProps {
    eventData: EventType;
}
export const EventForm = ({ eventData }: IEventFormProps) => {
    const { control, handleSubmit, watch } = useForm();
    const { handleCreateEvent } = useEventForm();

    const [file, setFile] = useState<File | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);
    const { onSubmitFile, deleteFile } = useUploadFile({});

    //@ts-ignore
    const onSubmit: SubmitHandler = (event: Event) => {
        handleCreateEvent(event);
        if (file && presignUrl) {
            onSubmitFile(file, presignUrl);
            if (eventData.image && file) {
                deleteFile(eventData.image);
            }
        }
    };

    const handleUploadedFile = (file: File, preUrl: string) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

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
                                        defaultValue={eventData.name || ''}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="location"
                            control={control}
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
                            defaultValue={eventData.privacy || Privacy.Public}
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
                                        defaultValue={eventData.description || ''}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <div className={classes.inputsDate}>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <Date title={'Начало'} date={eventData.startDate} {...field} />
                                )}
                            />
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <Date
                                        title={'Завершение'}
                                        date={eventData.endDate}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name="time"
                                control={control}
                                render={({ field }) => <Time time={eventData?.time} {...field} />}
                            />
                        </div>

                        <Controller
                            name="categories"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={categoriesList}
                                    eventCategories={[...(eventData.category?.categories ?? [])]}
                                    titleCategories={'Выбрать категорию'}
                                    badgesShow
                                    onChange={field.onChange}
                                    filter={false}
                                />
                            )}
                        />

                        <Controller
                            name="interests"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={interestsList}
                                    eventCategories={[...(eventData.interest?.interests ?? [])]}
                                    titleCategories={'Выбрать тип'}
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
                                    eventTags={[...(eventData.tag?.tags ?? [])]}
                                    title={'Создать тег'}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <UploadFile
                                entityId={eventData?._id as string}
                                folder={'events'}
                                imageUrl={eventData.image}
                                width={460}
                                height={324}
                                onUploadedFile={handleUploadedFile}
                                {...field}
                                sizeType={UploadFileSizes.event}
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
