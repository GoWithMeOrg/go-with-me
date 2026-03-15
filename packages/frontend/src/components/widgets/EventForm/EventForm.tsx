'use client';

import { Controller } from 'react-hook-form';
import { Privacy } from '@/app/graphql/types';
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

import { UploadFileSizes } from '../UploadFile/types/storage-folder';
import { useEventForm } from './hooks/useEventForm';
import { EventFormProps } from './interfaces/EventFormData';

import classes from './EventForm.module.css';

export const EventForm = ({ eventData }: EventFormProps) => {
    const { control, handleSubmit, handleUploadedFile, onSubmitData } = useEventForm();

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit(onSubmitData)} className={classes.form}>
                <div className={classes.formWrapper}>
                    <div className={classes.formField}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={eventData?.name || ''}
                            render={({ field }) => (
                                <Label label={'Название'}>
                                    <Input {...field} onChange={field.onChange} />
                                </Label>
                            )}
                        />

                        <Controller
                            name="location"
                            control={control}
                            defaultValue={eventData?.location}
                            render={({ field }) => (
                                <LocationPicker
                                    locationEvent={eventData?.location as any}
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
                            defaultValue={eventData?.description || ''}
                            render={({ field }) => (
                                <Label label={'Описание'}>
                                    <Textarea {...field} onChange={field.onChange} />
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
                                defaultValue={eventData?.time}
                                render={({ field }) => <Time time={eventData?.time} {...field} />}
                            />
                        </div>

                        <Controller
                            name="categories"
                            control={control}
                            defaultValue={eventData?.categories}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={categoriesList}
                                    eventCategories={eventData?.categories || []}
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
                            defaultValue={eventData?.interests}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={interestsList}
                                    eventCategories={eventData?.interests || []}
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
                            defaultValue={eventData?.tags}
                            render={({ field }) => (
                                <CreateTag
                                    onChange={field.onChange}
                                    eventTags={eventData?.tags || []}
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
                                entityId={eventData?._id as string}
                                folder={'events'}
                                imageUrl={eventData?.image}
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
