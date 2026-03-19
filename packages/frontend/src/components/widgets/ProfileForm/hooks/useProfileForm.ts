import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UPDATE_USER_PROFILE } from '@/app/graphql/mutations/updateUserProfile';
import { GET_USER_PROFILE_BY_ID } from '@/app/graphql/queries/userProfile';
import { Category, Interest, Location, Tag, User } from '@/app/graphql/types';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
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
    const user_id = session?._id;

    // submit и deleteFile приходят из UploadFile через onUploadedFile
    const submitFileRef = useRef<(() => Promise<void>) | null>(null);
    const uploadedFileRef = useRef<File | null>(null);
    const deleteFileRef = useRef<((url: string) => Promise<void>) | null>(null);

    const {
        data: userProfile,
        error,
        refetch,
    } = useQuery<{ userProfile: UserProfile }>(GET_USER_PROFILE_BY_ID, {
        variables: { userId: user_id },
    });

    const user = userProfile?.userProfile.user;
    const location = userProfile?.userProfile?.location;
    const interest = userProfile?.userProfile?.interest?.interests;
    const category = userProfile?.userProfile?.category?.categories;
    const tags = userProfile?.userProfile?.tag?.tags;

    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

    const place = watch('location');

    function mapGooglePlaceToLocationInput(place: any) {
        if (!place?.geometry?.location) return null;

        return {
            geometry: {
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            },
            properties: {
                address: place.formatted_address,
            },
        };
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
                        updateLocationInput: {
                            _id: userProfile?.userProfile.location._id,
                            geometry: transformedLocation.geometry,
                            properties: transformedLocation.properties,
                        },
                    }),

                // --- КАТЕГОРИИ ---
                ...(isNewCategory
                    ? {
                          createCategoryInput: {
                              categories: userProfileEdited.category?.categories,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          updateCategoryInput: {
                              categories: userProfileEdited.category?.categories,
                          },
                      }),

                // --- ИНТЕРЕСЫ ---
                ...(isNewInterest
                    ? {
                          createInterestInput: {
                              interests: userProfileEdited.interest?.interests,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          updateInterestInput: {
                              interests: userProfileEdited.interest?.interests,
                          },
                      }),

                // --- ТЕГИ ---
                ...(isNewTag
                    ? {
                          createTagInput: {
                              tags: userProfileEdited.tag?.tags,
                              ownerId: user_id,
                              ownerType: 'User',
                          },
                      }
                    : {
                          updateTagInput: {
                              tags: userProfileEdited.tag?.tags,
                          },
                      }),
            },
        });

        refetch();
    };

    const handleUploadFile = async () => {
        const submit = submitFileRef.current;
        const file = uploadedFileRef.current;
        const deleteFile = deleteFileRef.current;

        if (!submit || !file) return;

        await submit();

        if (deleteFile && user?.image) {
            await deleteFile(user.image);
            console.log('старый файл удалён');
        } else {
            console.warn('удаление пропущено', {
                hasDeleteFile: !!deleteFile,
                hasOldImage: !!user?.image,
            });
        }
    };

    const onSubmit: SubmitHandler<UserProfile> = async (data: UserProfile) => {
        try {
            await handleEditProfile(data);
            await handleUploadFile();
        } catch (err) {
            console.error('Ошибка при сохранении профиля:', err);
        }
    };

    // передаётся в UploadFile как onUploadedFile
    const onUploadedFile = (
        file: File,
        presignedUrl: string,
        submit: () => Promise<void>,
        deleteFile: (url: string) => Promise<void>
    ) => {
        uploadedFileRef.current = file;
        submitFileRef.current = submit;
        deleteFileRef.current = deleteFile;
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
        onUploadedFile,
        user_id,
    };
};
