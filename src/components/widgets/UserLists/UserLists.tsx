"use client";

import { FC } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_LISTS = gql`
    query GetLists {
        lists {
            _id
            description
            name
            users {
                name
                firstName
                lastName
                image
                email
            }
        }
    }
`;

const UserLists: FC = () => {
    const { loading, error, data: userLists, refetch } = useQuery(GET_LISTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log("userLists: ", userLists);

    return <div>UserLists</div>;
};

export { UserLists };
