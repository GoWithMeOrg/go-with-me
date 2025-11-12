'use client';

import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/shared/Button';
import { eventCategory, eventTypes } from '@/components/shared/Dropdown/dropdownLists';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared/Label';
import { Textarea } from '@/components/shared/Textarea';
import { CreateTag } from '@/components/widgets/CreateTag';
import { Date } from '@/components/widgets/Date';
import { EventStatus } from '@/components/widgets/EventStatus';
import { SelectItems } from '@/components/widgets/SelectItems';
import { Time } from '@/components/widgets/Time';
import { UploadFile } from '@/components/widgets/UploadFile';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { UploadFileSizes } from '@/components/widgets/UploadFile/UploadFile';
import { IEvent } from '@/database/models/Event';

import { Location } from '../Location';

import classes from './EventForm.module.css';

export type EventType = Partial<IEvent>;

export enum Status {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

interface IFormInputs {
  organizer_id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
    properties: {
      address: string;
    };
  };
  image: string;
  status: Status;
  categories: string[];
  types: string[];
  tags: string[];
}

interface IEventFormProps {
  eventData: EventType;
  onSubmitEvent: (event: EventType) => void;
}
export const EventForm = ({ eventData, onSubmitEvent }: IEventFormProps) => {
  const { control, handleSubmit, watch } = useForm<IFormInputs>();
  const [file, setFile] = useState<File | null>(null);
  const [presignUrl, setPresignUrl] = useState<string | null>(null);
  const { onSubmitFile, getDeleteFile } = useUploadFile({});

  const onSubmit: SubmitHandler<IFormInputs> = (event: EventType) => {
    onSubmitEvent(event);
    if (file && presignUrl) {
      onSubmitFile(file, presignUrl);
      if (eventData.image && file) {
        getDeleteFile(eventData.image);
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
                  <Input defaultValue={eventData.name || ''} onChange={field.onChange} />
                </Label>
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Location locationEvent={eventData?.location} onChange={field.onChange} />
              )}
            />

            <Controller
              name="status"
              control={control}
              defaultValue={(eventData.status || Status.PUBLIC) as Status}
              render={({ field }) => (
                <EventStatus options={Status} selected={field.value} {...field} />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Label label={'Описание'}>
                  <Textarea defaultValue={eventData.description || ''} onChange={field.onChange} />
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
                  <Date title={'Завершение'} date={eventData.endDate} {...field} />
                )}
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => <Time time={eventData.time} {...field} />}
              />
            </div>

            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <SelectItems
                  categoryList={eventCategory}
                  eventCategories={[...(eventData.categories ?? [])]}
                  titleCategories={'Выбрать категорию'}
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
                  eventCategories={[...(eventData.types ?? [])]}
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
                  eventTags={[...(eventData.tags ?? [])]}
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

export default EventForm;
