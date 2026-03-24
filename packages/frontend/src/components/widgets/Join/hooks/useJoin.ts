import { TOGGLE_JOIN_MUTATION } from '@/app/graphql/mutations/join';
import { GET_JOINED_USERS_BY_OWNER_ID, IS_JOINED_BY_USER } from '@/app/graphql/queries/join';
import { Join } from '@/app/graphql/types';
import { JoinProps } from '@/components/widgets/Join/interfaces/JoinProps';
import { useMutation, useQuery } from '@apollo/client/react';

const useJoin = ({ owner_id, ownerType }: JoinProps) => {
    const [toggleJoin] = useMutation(TOGGLE_JOIN_MUTATION);
    const { data: isJoinedUsersData } = useQuery<{
        getJoinedUsersByOwnerId: Join[];
    }>(GET_JOINED_USERS_BY_OWNER_ID, {
        variables: { ownerId: owner_id },
    });

    const { data: isJoinedData, refetch } = useQuery<{ isJoinedByUser: boolean }>(
        IS_JOINED_BY_USER,
        {
            variables: { ownerId: owner_id },
        }
    );

    const isJoined = !!isJoinedData?.isJoinedByUser;
    const joinedUsers = isJoinedUsersData?.getJoinedUsersByOwnerId.length;

    const handleJoin = async () => {
        try {
            await toggleJoin({
                variables: { ownerId: owner_id, ownerType },
                refetchQueries: [
                    {
                        query: GET_JOINED_USERS_BY_OWNER_ID,
                        variables: { ownerId: owner_id },
                    },
                ],
                awaitRefetchQueries: true,
            });
        } catch (error) {
            console.error('Error deleting join: ', error);
        }
        refetch();
    };

    return {
        handleJoin,
        joinedUsers,
        isJoined,
    };
};

export default useJoin;
