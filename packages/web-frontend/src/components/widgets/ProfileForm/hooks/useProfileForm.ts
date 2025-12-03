import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UPDATE_USER_PROFILE } from '@/app/graphql/mutations/updateUserProfile';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { Interest, Location, User } from '@/app/types/User';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_USER_PROFILE_BY_ID } from '@go-with-me/api-scheme/graphql/userProfile';

interface IFormProfile {
    user: User;
    location: Location;
    interest: Interest;
}

export interface UserProfile {
    user: User;
    location: Location;
    interest: Interest;
}

export const useProfileForm = () => {
    const { control, handleSubmit, watch } = useForm<IFormProfile>();
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

    const user = userProfile?.userProfile.user;
    const location = userProfile?.userProfile.location;
    const interest = userProfile?.userProfile.interest;

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

        console.log(newPlace);

        return newPlace;
    }

    const handleEditProfile = async (userProfileEdited: UserProfile) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);

        if (!transformedLocation) {
            console.error('Ошибка: transformedLocation пустой');
            return;
        }

        await updateUserProfile({
            variables: {
                userId: user_id,
                interestId: userProfile?.userProfile.interest?._id,
                locationId: userProfile?.userProfile.location?._id,

                updateUserInput: {
                    _id: userProfile?.userProfile.user._id,
                    firstName: userProfileEdited.user.firstName,
                    lastName: userProfileEdited.user.lastName,
                    description: userProfileEdited.user.description,
                    email: userProfileEdited.user.email,
                    image: userProfileEdited.user.image,
                },

                updateLocationInput: {
                    _id: userProfile?.userProfile.location._id,
                    geometry: transformedLocation.geometry,
                    properties: transformedLocation.properties,
                },

                updateInterestInput: {
                    _id: userProfile?.userProfile.interest._id,
                    interest: userProfileEdited.interest.interest,
                },
            },
        });
        refetch();
    };

    const onSubmit: SubmitHandler<IFormProfile> = (event: UserProfile) => {
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
        handleSubmit,
        onSubmit,
        control,
        handleUploadedFile,
        user_id,
    };
};
