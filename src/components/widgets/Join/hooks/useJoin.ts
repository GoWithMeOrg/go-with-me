import { useMutation, useQuery } from "@apollo/client";

import { JOIN_MUTATION } from "@/app/api/graphql/mutations/join";
import { JOINED_BY_USER, JOINED_BY_USERS } from "@/app/api/graphql/queries/joined";

import { JoinProps } from "@/components/widgets/Join/types/JoinProps";
import { IJoined, IGetJoined } from "@/components/widgets/Join/types/IJoined";

const useJoin = ({ event_id, user_id }: JoinProps) => {
    const { data, refetch: refetchJoinedUsers } = useQuery<IGetJoined | null>(JOINED_BY_USERS, {
        variables: { eventId: event_id },
    });

    const { data: joinedByUser, refetch: refetchJoinedUser } = useQuery<{ joinedByUser: IJoined | null }>(
        JOINED_BY_USER,
        {
            variables: { eventId: event_id, userId: user_id },
        },
    );

    const joinedUsers = data?.joinedByUsers.length;
    const isJoined = joinedByUser?.joinedByUser?.isJoined;

    const [joinEventMutation] = useMutation(JOIN_MUTATION);

    const handleJoin = async () => {
        try {
            await joinEventMutation({
                variables: { eventId: event_id, userId: user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetchJoinedUsers();
        refetchJoinedUser();
    };

    return {
        handleJoin,
        joinedUsers,
        isJoined,
    };
};

export default useJoin;
