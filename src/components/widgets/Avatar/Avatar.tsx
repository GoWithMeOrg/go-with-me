import { FC, HTMLAttributes } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

import { IUser } from "@/database/models/User";

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        user(id: $userId) {
            image
        }
    }
`;
interface AvatarProps extends HTMLAttributes<HTMLDivElement>, Pick<IUser, "name"> {
    scale?: number;
}

export const Avatar: FC<AvatarProps> = () => {
    const { data: session } = useSession();
    //@ts-ignore
    const userId = session?.user?.id;
    const { data: userData, refetch } = useQuery(GET_USER_BY_ID, { variables: { userId: userId } });
    return (
        <Image
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            src={userData?.user?.image}
            alt="img"
        />
    );
};
