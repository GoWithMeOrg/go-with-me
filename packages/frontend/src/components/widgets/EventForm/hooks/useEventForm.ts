import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import { CreateEventMutationVariables } from '@/app/graphql/types';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useMutation } from '@apollo/client/react';

import { UploadData } from '../../UploadFile/interfaces/GetPresignedUrlData';
import { EventFormData } from '../eventForm.interfaces';

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

    if (data.location) {
        variables.createLocationInput = {
            geometry: { coordinates: data.location.geometry?.coordinates },
            properties: { address: data.location.properties?.address },
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

export const useEventForm = () => {
    const { control, handleSubmit } = useForm<EventFormData>();

    const [uploadData, setUploadData] = useState<UploadData | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);

    const { onSubmitFile, deleteFile } = useUploadFile({});
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    const handleCreateEvent = async (data: EventFormData): Promise<void> => {
        const variables = buildEventVariables(data);
        console.log(variables);
        try {
            // await createEvent({ variables });
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
