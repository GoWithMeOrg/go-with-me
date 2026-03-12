import { useForm } from 'react-hook-form';
import { CREATE_EVENT_MUTATION } from '@/app/graphql/mutations/event';
import { useMutation } from '@apollo/client/react';

export const useEventForm = () => {
    const { control, handleSubmit, watch } = useForm();

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    // const place = watch('location');

    // function mapGooglePlaceToLocationInput(place: any) {
    //     if (!place || !place.geometry || !place.geometry.location) return null;
    //     const newPlace = {
    //         geometry: {
    //             coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
    //         },
    //         properties: {
    //             address: place.formatted_address,
    //         },
    //     };

    //     return newPlace;
    // }

    const handleCreateEvent = async (createEventForm: any) => {
        console.log(createEventForm);

        const variables: any = {
            createEventInput: {
                name: createEventForm.name,
                privacy: createEventForm.privacy,
                description: createEventForm.description,
                startDate: createEventForm.startDate,
                endDate: createEventForm.endDate,
                time: createEventForm.time,
                image: createEventForm.image,
            },
        };

        if (createEventForm.location?.coordinates) {
            variables.createLocationInput = {
                geometry: {
                    coordinates: createEventForm.location.coordinates,
                },
                properties: {
                    address: createEventForm.location.properties?.address,
                },
            };
        }

        if (createEventForm.categories?.length > 0) {
            variables.createCategoryInput = {
                categories: createEventForm.categories,
            };
        }

        if (createEventForm.interests?.length > 0) {
            variables.createInterestInput = {
                interests: createEventForm.interests,
            };
        }

        if (createEventForm.tags?.length > 0) {
            variables.createTagInput = {
                tags: createEventForm.tags,
            };
        }

        console.log('Итоговые переменные для GraphQL:', variables);

        await createEvent({ variables });
    };

    return { handleCreateEvent };
};
