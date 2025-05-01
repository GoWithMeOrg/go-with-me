"use client";

import { FC, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Title } from "@/components/shared/Title";
import classes from "./Companions.module.css";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";

const GET_FIND_USERS = gql`
    query Query($email: String, $name: String) {
        findUsers(email: $email, name: $name) {
            _id
            name
            image
        }
    }
`;

export const Companions: FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const fullName = firstName + " " + lastName;

    const { loading, error, data, refetch } = useQuery(GET_FIND_USERS, {
        variables: {
            email,
            name: fullName,
        },
    });

    console.log(data);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error : {error.message}</p>;

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        refetch();
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        refetch();
    };

    // const handleEmailChange = (email: string) => {
    //     setEmail(email);
    //     // refetch();
    // };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className={classes.searchCompanions}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Найти компаньонов" />
            </div>

            <div className={classes.line}></div>

            <div className={classes.filters}>
                <Label label={"First Name"}>
                    <Input onChange={handleFirstNameChange} />
                </Label>

                <Label label={"Last Name"}>
                    <Input onChange={handleLastNameChange} />
                </Label>

                <Label label={"Email"}>
                    <Input onChange={handleEmailChange} />
                </Label>
            </div>
            {data && <div>{data?.userByEmail?.name}</div>}
        </div>
    );
};
