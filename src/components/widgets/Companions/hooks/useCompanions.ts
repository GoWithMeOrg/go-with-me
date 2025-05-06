import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_FIND_USERS } from "@/app/api/graphql/queries/findUsers";
import { GET_COMPANIONS } from "@/app/api/graphql/queries/companions";
import { useSession } from "next-auth/react";

export const useCompanions = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const name = firstName + " " + lastName;

    const { loading, error, data, refetch } = useQuery(GET_FIND_USERS, {
        variables: {
            email,
            name,
        },
    });

    const {
        loading: errorloading,
        error: errorCompanions,
        data: dataCompanions,
        refetch: refetchCompanions,
    } = useQuery(GET_COMPANIONS, {
        variables: { userId: user_id },
    });

    const findUsers = data?.findUsers || [];
    const companions = dataCompanions?.companions || [];

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        refetch();
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        refetch();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        refetch();
    };

    return { handleFirstNameChange, handleLastNameChange, handleEmailChange, findUsers, companions };
};
