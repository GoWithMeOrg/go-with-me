import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

import { GET_APPLICATIONS } from "@/app/api/graphql/queries/applications";

export const useNotifications = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;
    const { data, refetch } = useQuery(GET_APPLICATIONS, {
        variables: {
            userId: user_id,
        },
    });

    const dataApplications = data?.getApplications;

    return { dataApplications, refetch };
};
