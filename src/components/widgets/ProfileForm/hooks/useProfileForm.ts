import { use, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";

import { useUploadFile } from "@/components/widgets/UploadFile/hooks";

import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { UPDATE_USER } from "@/app/api/graphql/mutations/user";

import { IUser, ProfileType } from "@/database/types/User";

interface IFormProfile {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    location: {
        type: "Point";
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

export const useProfileForm = () => {
    const router = useRouter();
    const { control, handleSubmit, watch } = useForm<IFormProfile>();
    const { data: session } = useSession();
    const { onSubmitFile, getDeleteFile } = useUploadFile({});

    const [file, setFile] = useState<File | null>(null);
    const [presignUrl, setPresignUrl] = useState<string | null>(null);

    const user_id = session?.user?.id;
    const {
        data: userData,
        refetch,
        loading,
        error,
    } = useQuery<{ user: IUser }>(GET_USER_BY_ID, { variables: { userId: user_id } });
    const [updateUser] = useMutation(UPDATE_USER);

    const place = watch("location");
    const firstName = watch("firstName") || userData?.user?.name.split(" ")[0];
    const lastName = watch("lastName") || userData?.user?.name.split(" ")[1];

    function mapGooglePlaceToLocationInput(place: any) {
        if (!place || !place.geometry) return null;
        const newPlace = {
            type: "Point",
            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            properties: {
                address: place.formatted_address,
            },
        };

        return newPlace;
    }

    //убираем __typename иначе ошибка при обновлении профиля
    const locationWithoutTypename = {
        type: userData?.user.location.type,
        coordinates: userData?.user.location.coordinates,
        properties: {
            address: userData?.user.location.properties.address,
        },
    };

    const handleEditProfile = (userEdited: Partial<IUser>) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);

        updateUser({
            variables: {
                updateUserId: user_id,
                user: {
                    ...userEdited,
                    name: `${firstName} ${lastName}`,
                    location: transformedLocation || locationWithoutTypename,
                },
            },
        }).then((response) => {
            console.log("UserEditPage: ", response);
        });
        refetch();
    };

    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        handleEditProfile(event);
        if (file && presignUrl) {
            onSubmitFile(file, presignUrl);
            if (userData?.user?.image && file) {
                getDeleteFile(userData?.user?.image);
            }
        }
    };

    const handleUploadedFile = (file: File, preUrl: string) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

    return { error, userData, handleSubmit, onSubmit, control, handleUploadedFile, user_id };
};
