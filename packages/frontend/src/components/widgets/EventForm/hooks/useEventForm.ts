import { SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_EVENT_MUTATION, UPDATE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import {
    CreateEventMutation,
    CreateEventMutationVariables,
    UpdateEventMutation,
    UpdateEventMutationVariables,
} from '@/app/graphql/types';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';

import { EventFormData, UseEventFormProps } from '../interfaces/eventForm';

// Формирует общие данные для мутаций создания и обновления события
const buildEventInput = (data: EventFormData) => ({
    name: data.name,
    privacy: data.privacy,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    time: data.time,
    image: data.image,
});

// Формирует дополнительные поля (location, category, interest, tag) для мутаций
const buildAdditionalFields = (data: EventFormData) => {
    const fields: Partial<CreateEventMutationVariables> = {};
    console.log('входные данные', data);

    if (data.location?.geometry?.coordinates && data.location.properties?.address) {
        fields.createLocationInput = {
            geometry: { coordinates: data.location.geometry.coordinates },
            properties: { address: data.location.properties.address },
        };
    }

    if (data.category?.length) {
        fields.createCategoryInput = { categories: data.category };
    }

    if (data.interest?.length) {
        fields.createInterestInput = { interests: data.interest };
    }

    if (data.tag?.length) {
        fields.createTagInput = { tags: data.tag };
    }

    console.log(fields.createLocationInput);
    return fields;
};

// Формирует переменные для мутации создания события
const buildCreateVariables = (data: EventFormData): CreateEventMutationVariables => ({
    createEventInput: buildEventInput(data),
    ...buildAdditionalFields(data),
});

// Формирует переменные для мутации обновления события
const buildUpdateVariables = (id: string, data: EventFormData): UpdateEventMutationVariables => ({
    updateEventId: id,
    updateEventInput: buildEventInput(data),
    ...buildAdditionalFields(data),
});

// Обрабатывает загрузку и удаление файлов после успешной мутации
const handleFileOperations = async (
    submitFileRef: UseEventFormProps['submitFileRef'],
    deleteFileRef: UseEventFormProps['deleteFileRef'],
    currentImage?: string | null
) => {
    try {
        if (submitFileRef.current) {
            await submitFileRef.current();
        }

        if (deleteFileRef.current && currentImage) {
            await deleteFileRef.current(currentImage);
        }
    } catch (error) {
        console.error('Ошибка при обработке файлов:', error);
        throw error;
    }
};

export const useEventForm = ({ eventData, submitFileRef, deleteFileRef }: UseEventFormProps) => {
    const { control, handleSubmit, watch } = useForm<EventFormData>({
        defaultValues: {
            name: eventData?.name ?? '',
            privacy: eventData?.privacy ?? undefined,
            description: eventData?.description ?? undefined,
            startDate: eventData?.startDate ?? undefined,
            endDate: eventData?.endDate ?? undefined,
            time: eventData?.time ?? undefined,
            image: eventData?.image ?? undefined,
            location: eventData?.location ?? undefined,
            category: eventData?.category?.categories ?? undefined,
            interest: eventData?.interest?.interests ?? undefined,
            tag: eventData?.tag?.tags ?? undefined,
        },
    });

    const router = useRouter();

    const [createEvent] = useMutation<CreateEventMutation, CreateEventMutationVariables>(
        CREATE_EVENT_MUTATION
    );
    const [updateEvent] = useMutation<UpdateEventMutation, UpdateEventMutationVariables>(
        UPDATE_EVENT_MUTATION
    );

    const isEditMode = !!eventData?._id;

    const handleCreateEvent = async (data: EventFormData): Promise<string> => {
        const variables = buildCreateVariables(data);
        const { data: mutationData } = await createEvent({ variables });

        if (!mutationData?.createEvent?._id) {
            throw new Error('Failed to create event: no event ID returned');
        }
        return mutationData.createEvent._id;
    };

    const handleUpdateEvent = async (data: EventFormData): Promise<string> => {
        if (!eventData?._id) {
            throw new Error('Event ID is required for update');
        }
        const variables = buildUpdateVariables(eventData._id, data);
        const { data: mutationData } = await updateEvent({ variables });

        if (!mutationData?.updateEvent?._id) {
            throw new Error('Failed to update event: no event ID returned');
        }
        return mutationData.updateEvent._id;
    };

    const onSubmit: SubmitHandler<EventFormData> = async (data) => {
        try {
            // Сначала загружаем файл в S3 (если есть новый файл)
            await handleFileOperations(submitFileRef, deleteFileRef, eventData?.image);

            // Затем создаём/обновляем событие с URL изображения
            let eventId: string;

            if (isEditMode) {
                eventId = await handleUpdateEvent(data);
            } else {
                eventId = await handleCreateEvent(data);
            }

            router.push(`/events/${eventId}`);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            throw error;
        }
    };

    return {
        control,
        handleSubmit,
        onSubmit,
        originalImage: eventData?.image,
        isEditMode,

        watch,
    };
};
