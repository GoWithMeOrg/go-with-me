import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UPDATE_USER_PROFILE } from '@/app/graphql/mutations/updateUserProfile';
import { GET_USER_PROFILE_BY_ID } from '@/app/graphql/queries/userProfile';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { Category, Interest, Location, Tag, User } from '@/app/types/types';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useMutation, useQuery } from '@apollo/client/react';

export interface UserProfile {
    user: User;
    location: Location;
    category: Category;
    interest: Interest;
    tag: Tag;
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
    const interest = userProfile?.userProfile?.interest?.interests;
    const category = userProfile?.userProfile?.category?.categories;
    const tags = userProfile?.userProfile?.tag?.tags;

    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

    const place = watch('location');

    function mapGooglePlaceToLocationInput(place: any) {
        if (!place || !place.geometry || !place.geometry.location) return null;
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

    const isNewCategory = !userProfile?.userProfile.category?._id;
    const isNewInterest = !userProfile?.userProfile.interest?._id;
    const isNewLocation = !userProfile?.userProfile.location?._id;
    const isNewTag = !userProfile?.userProfile.tag?._id;

    const handleEditProfile = async (userProfileEdited: UserProfile) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);

        await updateUserProfile({
            variables: {
                userId: user_id,
                interestId: userProfile?.userProfile.interest?._id || null,
                categoryId: userProfile?.userProfile.category?._id || null,
                tagId: userProfile?.userProfile.tag?._id || null,
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
                            properties: {
                                address: transformedLocation.properties.address,
                                ownerId: user_id,
                                ownerType: 'User',
                            },
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
                          //   createCategoryInput: {
                          //       // Предполагаем, что CreateCategoriesInput принимает 'categories'
                          //       category: userProfileEdited.category?.categories,
                          //       ownerId: user_id,
                          //       ownerType: 'User',
                          //   },
                          createCategoryInput: {
                              categories: userProfileEdited.category?.categories,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          // ID ЕСТЬ = ОБНОВЛЕНИЕ
                          updateCategoryInput: {
                              _id: userProfile?.userProfile.category._id,
                              categories: userProfileEdited.category?.categories,
                          },
                      }),

                // --- ИНТЕРЕСЫ ---
                ...(isNewInterest
                    ? {
                          // ID НЕТ = СОЗДАНИЕ
                          createInterestInput: {
                              // Предполагаем, что CreateInterestInput принимает 'interest'
                              interests: userProfileEdited.interest?.interests,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          // ID ЕСТЬ = ОБНОВЛЕНИЕ
                          updateInterestInput: {
                              _id: userProfile?.userProfile.interest._id,
                              interests: userProfileEdited.interest?.interests,
                          },
                      }),
                // --- ТЕГИ ---
                ...(isNewTag
                    ? {
                          // ID НЕТ = СОЗДАНИЕ
                          createTagInput: {
                              // Предполагаем, что CreateInterestInput принимает 'interest'
                              tags: userProfileEdited.tag?.tags,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          // ID ЕСТЬ = ОБНОВЛЕНИЕ
                          updateTagInput: {
                              _id: userProfile?.userProfile.tag._id,
                              tags: userProfileEdited.tag?.tags,
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
        category,
        tags,
        handleSubmit,
        onSubmit,
        control,
        handleUploadedFile,
        user_id,
    };
};
