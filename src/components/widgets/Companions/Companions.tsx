"use client";

import { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { Title } from "@/components/shared/Title";
import classes from "./Companions.module.css";

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

export const Companions: FC = () => {
    const { loading, error, data: userLists, refetch } = useQuery(GET_LISTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className={classes.filteredEvents}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Найти компаньонов" />
            </div>

            <div className={classes.line}></div>

            <div className={classes.filters}></div>
        </div>
    );
};
