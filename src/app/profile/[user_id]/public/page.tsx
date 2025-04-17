"use client";

import { useSession } from "next-auth/react";

import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { useQuery } from "@apollo/client";
import { Geocoding } from "@/components/widgets/GoogleMap";
import { Badges } from "@/components/shared/Badges";

const PublicProfile = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;

    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: user_id } });

    return (
        <div>
            <div>{userData?.user?.firstName}</div>
            <div>{userData?.user?.lastName}</div>
            <div>{userData?.user?.email}</div>
            <img src={userData?.user?.image} alt="" style={{ width: "300px" }} />
            <div>{userData?.user?.aboutMe}</div>
            {userData?.user?.location?.coordinates && (
                <Geocoding
                    coordinates={[userData.user.location.coordinates[0], userData.user.location.coordinates[1]]}
                />
            )}

            {/* <Badges badges={userData?.user?.categories} /> */}
        </div>
    );
};

export default PublicProfile;
