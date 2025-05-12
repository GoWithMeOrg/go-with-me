import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";

import { GET_APPLICATIONS } from "@/app/api/graphql/queries/applications";
import { GET_INVATIONS, GET_INVATIONS_WITH_STATUS } from "@/app/api/graphql/queries/invations";

export const useNotifications = () => {
    const { data: session } = useSession();
    const user_id = session?.user.id;
    const { data, refetch } = useQuery(GET_APPLICATIONS, {
        variables: {
            userId: user_id,
        },
        pollInterval: 5000,
    });

    const { data: invations } = useQuery(GET_INVATIONS, {
        variables: {
            userId: user_id,
        },
        //pollInterval: 5000,
    });

    // const { data: status } = useQuery(GET_INVATIONS_WITH_STATUS, {
    //     variables: {
    //         userId: user_id,
    //     },
    //     pollInterval: 5000,
    // });

    const dataApplications = data?.getApplications || [];
    const dataInvations = invations?.getInvitation || [];
    console.log(dataInvations[0]?.user._id);

    return { dataApplications, dataInvations, refetch, user_id };
};
