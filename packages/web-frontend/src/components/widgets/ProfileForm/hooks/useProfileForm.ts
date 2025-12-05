import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UPDATE_USER_PROFILE } from '@/app/graphql/mutations/updateUserProfile';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { Categories, Interest, Location, User } from '@/app/types/types';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_USER_PROFILE_BY_ID } from '@go-with-me/api-scheme/graphql/userProfile';

export interface UserProfile {
    user: User;
    location: Location;
    categories: Categories;
    interest: Interest;
}

export const useProfileForm = () => {
    const { control, handleSubmit, watch } = useForm<UserProfile>();
    const { data: session } = useSessionGQL();
    const { onSubmitFile, getDeleteFile } = useUploadFile({});

    const [file, setFile] = useState<File | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);

    const user_id = session?._id;

    const {
        data: userProfile,
        error,
        refetch,
    } = useQuery<{ userProfile: UserProfile }>(GET_USER_PROFILE_BY_ID, {
        variables: { userId: session?._id },
    });

    console.log(userProfile);
    const user = userProfile?.userProfile.user;
    const location = userProfile?.userProfile?.location;
    const interest = userProfile?.userProfile?.interest?.interest;
    const categories = userProfile?.userProfile?.categories?.categories;

    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

    const place = watch('location');

    console.log(place);
    function mapGooglePlaceToLocationInput(place: any) {
        if (!place || !place.geometry) return null;
        const newPlace = {
            geometry: {
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            },
            properties: {
                address: place.formatted_address,
            },
        };

        return newPlace;
    }

    const isNewCategory = !userProfile?.userProfile.categories?._id;
    const isNewInterest = !userProfile?.userProfile.interest?._id;
    const isNewLocation = !userProfile?.userProfile.location?._id;

    const handleEditProfile = async (userProfileEdited: UserProfile) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);

        await updateUserProfile({
            variables: {
                userId: user_id,
                interestId: userProfile?.userProfile.interest?._id || null,
                categoriesId: userProfile?.userProfile.categories?._id || null,
                locationId: userProfile?.userProfile.location?._id || null,

                // Только обновляем
                updateUserInput: {
                    _id: userProfile?.userProfile.user._id,
                    firstName: userProfileEdited.user.firstName,
                    lastName: userProfileEdited.user.lastName,
                    description: userProfileEdited.user.description,
                    email: userProfileEdited.user.email,
                    image: userProfileEdited.user.image,
                },

                // --- ЛОКАЦИЯ ---
                ...(transformedLocation &&
                    isNewLocation && {
                        // ID НЕТ + ДАННЫЕ ЕСТЬ = СОЗДАНИЕ
                        createLocationInput: {
                            geometry: transformedLocation.geometry,
                            properties: transformedLocation.properties,
                        },
                    }),
                ...(transformedLocation &&
                    !isNewLocation && {
                        // ID ЕСТЬ + ДАННЫЕ ЕСТЬ = ОБНОВЛЕНИЕ
                        updateLocationInput: {
                            _id: userProfile?.userProfile.location._id,
                            geometry: transformedLocation.geometry,
                            properties: transformedLocation.properties,
                        },
                    }),

                // --- КАТЕГОРИИ ---
                ...(isNewCategory
                    ? {
                          // ID НЕТ = СОЗДАНИЕ
                          createCategoriesInput: {
                              // Предполагаем, что CreateCategoriesInput принимает 'categories'
                              categories: userProfileEdited.categories.categories,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          // ID ЕСТЬ = ОБНОВЛЕНИЕ
                          updateCategoriesInput: {
                              _id: userProfile?.userProfile.categories._id,
                              categories: userProfileEdited.categories.categories,
                          },
                      }),

                // --- ИНТЕРЕСЫ ---
                ...(isNewInterest
                    ? {
                          // ID НЕТ = СОЗДАНИЕ
                          createInterestInput: {
                              // Предполагаем, что CreateInterestInput принимает 'interest'
                              interest: userProfileEdited.interest.interest,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          // ID ЕСТЬ = ОБНОВЛЕНИЕ
                          updateInterestInput: {
                              _id: userProfile?.userProfile.interest._id,
                              interest: userProfileEdited.interest.interest,
                          },
                      }),
            },
        });
        refetch();
    };

    const onSubmit: SubmitHandler<UserProfile> = (event: UserProfile) => {
        handleEditProfile(event);
        if (file && presignUrl) {
            onSubmitFile(file, presignUrl);
            if (user?.image && file) {
                getDeleteFile(user?.image);
            }
        }
    };

    const handleUploadedFile = (file: File, preUrl: string) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

    return {
        error,
        user,
        location,
        interest,
        categories,
        handleSubmit,
        onSubmit,
        control,
        handleUploadedFile,
        user_id,
    };
};
