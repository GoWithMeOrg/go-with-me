import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useMutation } from '@apollo/client/react';

import { UploadData } from '../../UploadFile/interfaces/GetPresignedUrlData';
import { CreateEventVariables, EventFormData } from '../interfaces/EventFormData';

const buildEventVariables = (data: EventFormData): CreateEventVariables => {
    const variables: CreateEventVariables = {
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

    if (data.location?.coordinates) {
        variables.createLocationInput = {
            geometry: { coordinates: data.location.coordinates },
            properties: { address: data.location.properties?.address },
        };
    }

    if (data.categories?.length) {
        variables.createCategoryInput = { categories: data.categories };
    }

    if (data.interests?.length) {
        variables.createInterestInput = { interests: data.interests };
    }

    if (data.tags?.length) {
        variables.createTagInput = { tags: data.tags };
    }

    return variables;
};

export const useEventForm = () => {
    const { control, handleSubmit } = useForm<EventFormData>();

    const [uploadData, setUploadData] = useState<UploadData | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);

    const { onSubmitFile, deleteFile } = useUploadFile({});
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    const handleCreateEvent = async (data: EventFormData): Promise<void> => {
        const variables = buildEventVariables(data);

        try {
            await createEvent({ variables });
        } catch (error) {
            console.error('Ошибка при создании события:', error);
            throw error;
        }
    };

    const handleUploadedFile = (file: File, presignUrl: string): void => {
        setUploadData({ file, presignUrl });
    };

    const handleImageLoad = (imageUrl: string): void => {
        setOriginalImage(imageUrl);
    };

    const onSubmitData: SubmitHandler<EventFormData> = async (data) => {
        try {
            await handleCreateEvent(data);

            if (uploadData) {
                await onSubmitFile(uploadData.file, uploadData.presignUrl);

                if (originalImage) {
                    await deleteFile(originalImage);
                }
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    };

    return {
        control,
        handleSubmit,
        handleUploadedFile,
        handleImageLoad,
        onSubmitData,
    };
};
