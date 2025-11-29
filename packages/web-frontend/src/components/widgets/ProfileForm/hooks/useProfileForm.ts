import { use, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UPDATE_USER } from '@/app/graphql/mutations/user';
import { GET_USER_BY_ID } from '@/app/graphql/queries/user';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { Location, User } from '@/app/types/User';
import { useUploadFile } from '@/components/widgets/UploadFile/hooks';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_USER_PROFILE_BY_ID } from '@go-with-me/api-scheme/graphql/userProfile';
import { IUser, ProfileType } from '@go-with-me/api-scheme/types/User';

interface IFormProfile {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    description: string;
    image: string;
    categories: string[];
    types: string[];
    tags: string[];
}

export interface UserProfile {
    user: User;
    location: Location;
}

export const useProfileForm = () => {
    const { control, handleSubmit, watch } = useForm<IFormProfile>();
    const { data: session } = useSessionGQL();
    const { onSubmitFile, getDeleteFile } = useUploadFile({});

    const [file, setFile] = useState<File | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);

    const user_id = session?._id;
    const {
        data: userData,
        refetch,
        error,
    } = useQuery(GET_USER_BY_ID, {
        variables: { userId: session?._id },
    });

    const { data: userProfile } = useQuery<{ userProfile: UserProfile }>(GET_USER_PROFILE_BY_ID, {
        variables: { userId: session?._id },
    });

    const user = userProfile?.userProfile.user;
    const location = userProfile?.userProfile.location;

    const [updateUser] = useMutation(UPDATE_USER);

    const place = watch('location');

    function mapGooglePlaceToLocationInput(place: any) {
        if (!place || !place.geometry) return null;
        const newPlace = {
            type: 'Point',
            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            properties: {
                address: place.formatted_address,
            },
        };

        return newPlace;
    }

    //убираем __typename иначе ошибка при обновлении профиля
    // const locationWithoutTypename = {
    //     type: userData?.user.location.type,
    //     coordinates: userData?.user.location.coordinates,
    //     properties: {
    //         address: userData?.user.location.properties.address,
    //     },
    // };

    const handleEditProfile = (userEdited: Partial<IUser>) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);

        updateUser({
            variables: {
                updateUserId: user_id,
                user: {
                    ...userEdited,
                    // location: transformedLocation || locationWithoutTypename,
                },
            },
        }).then((response) => {
            console.log('UserEditPage: ', response);
        });
        refetch();
    };

    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        handleEditProfile(event);
        if (file && presignUrl) {
            // onSubmitFile(file, presignUrl);
            // if (userData?.user?.image && file) {
            //     getDeleteFile(userData?.user?.image);
            // }
        }
    };

    const handleUploadedFile = (file: File, preUrl: string) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

    return { error, user, location, handleSubmit, onSubmit, control, handleUploadedFile, user_id };
};
