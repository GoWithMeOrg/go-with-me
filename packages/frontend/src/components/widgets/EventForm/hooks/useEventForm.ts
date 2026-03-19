import { SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_EVENT_MUTATION, UPDATE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import { CreateEventMutationVariables, UpdateEventMutationVariables } from '@/app/graphql/types';
import { useMutation } from '@apollo/client/react';

import { EventFormData, UseEventFormProps } from '../eventForm.interfaces';

const buildEventVariables = (data: EventFormData) => {
    const variables: CreateEventMutationVariables = {
        createEventInput: {
            name: data.name,
            privacy: data.privacy,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            time: data.time,
            image: data.image,
        },
    };

    if (data.location?.geometry?.coordinates && data.location.properties?.address) {
        variables.createLocationInput = {
            geometry: { coordinates: data.location.geometry.coordinates },
            properties: { address: data.location.properties.address },
        };
    }

    if (data.category?.length) {
        variables.createCategoryInput = { categories: data.category };
    }

    if (data.interest?.length) {
        variables.createInterestInput = { interests: data.interest };
    }

    if (data.tag?.length) {
        variables.createTagInput = { tags: data.tag };
    }

    return variables;
};

const buildUpdateVariables = (id: string, data: EventFormData): UpdateEventMutationVariables => {
    const variables: UpdateEventMutationVariables = {
        updateEventId: id,
        updateEventInput: {
            name: data.name,
            privacy: data.privacy,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            time: data.time,
            image: data.image,
        },
    };

    if (data.location?.geometry?.coordinates && data.location.properties?.address) {
        variables.createLocationInput = {
            geometry: { coordinates: data.location.geometry.coordinates },
            properties: { address: data.location.properties.address },
        };
    }

    if (data.category?.length) {
        variables.createCategoryInput = { categories: data.category };
    }

    if (data.interest?.length) {
        variables.createInterestInput = { interests: data.interest };
    }

    if (data.tag?.length) {
        variables.createTagInput = { tags: data.tag };
    }

    return variables;
};

export const useEventForm = ({ eventData, submitFileRef, deleteFileRef }: UseEventFormProps) => {
    const { control, handleSubmit } = useForm<EventFormData>();

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
    const [updateEvent] = useMutation(UPDATE_EVENT_MUTATION);

    const handleCreateEvent = async (data: EventFormData): Promise<void> => {
        const variables = buildEventVariables(data);
        console.log(variables);
        try {
            await createEvent({ variables });
        } catch (error) {
            console.error('Ошибка при создании события:', error);
            throw error;
        }
    };

    const handleEditEvent = async (data: EventFormData) => {
        if (!eventData?._id) {
            throw new Error('Event ID is required for update');
        }
        const variables = buildUpdateVariables(eventData._id, data);
        try {
            await updateEvent({ variables });
        } catch (error) {
            console.error('Ошибка при редактировании события:', error);
            throw error;
        }
    };

    const onSubmitData: SubmitHandler<EventFormData> = async (data) => {
        try {
            await handleCreateEvent(data);

            if (submitFileRef.current) {
                await submitFileRef.current();
            }

            if (deleteFileRef.current && eventData?.image) {
                await deleteFileRef.current(eventData.image);
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

    const onSubmitEditData: SubmitHandler<EventFormData> = async (data) => {
        try {
            await handleEditEvent(data);

            if (submitFileRef.current) {
                await submitFileRef.current();
            }

            if (deleteFileRef.current && eventData?.image) {
                await deleteFileRef.current(eventData.image);
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

    return {
        control,
        handleSubmit,
        onSubmitData,
        onSubmitEditData,
        originalImage: eventData?.image,
    };
};
