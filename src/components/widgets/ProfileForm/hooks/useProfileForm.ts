import { IUser } from "@/database/types/User";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFile } from "../../UploadFile/hooks";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { UPDATE_USER } from "@/app/api/graphql/mutations/user";

export type ProfileType = Partial<IUser>;

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
    const { data: userData, refetch, loading, error } = useQuery(GET_USER_BY_ID, { variables: { userId: user_id } });
    const [updateUser] = useMutation(UPDATE_USER);

    const place = watch("location");
    const firstName = watch("firstName");
    const lastName = watch("lastName");

    function mapGooglePlaceToLocationInput(place: any) {
        if (!place || !place.geometry) return null;

        return {
            type: "Point",
            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()],
            properties: {
                address: place.formatted_address,
            },
        };
    }

    const handleEditProfile = (userEdited: Partial<IUser>) => {
        const transformedLocation = mapGooglePlaceToLocationInput(place);
        updateUser({
            variables: {
                updateUserId: user_id,
                user: { ...userEdited, location: transformedLocation, name: `${firstName} ${lastName}` },
            },
        }).then((response) => {
            console.log("UserEditPage: ", response); // eslint-disable-line
            router.push(`/profile/${user_id}/public`);
        });
        refetch();
    };

    const onSubmit: SubmitHandler<IFormProfile> = (event: ProfileType) => {
        handleEditProfile(event);
        if (file && presignUrl) {
            onSubmitFile(file, presignUrl);
            if (userData.image && file) {
                getDeleteFile(userData.image);
            }
        }
    };

    const handleUploadedFile = (file: File, preUrl: string) => {
        setFile(file);
        setPresignUrl(preUrl);
    };

    return { error, userData, handleSubmit, onSubmit, control, handleUploadedFile };
};
