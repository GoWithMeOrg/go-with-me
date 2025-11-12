import { JOIN_MUTATION } from '@/app/api/graphql/mutations/join';
import {
  GET_JOINED_EVENTS,
  JOINED_BY_USER,
  JOINED_BY_USERS,
} from '@/app/api/graphql/queries/joined';
import { IGetJoined, IJoined } from '@/components/widgets/Join/types/IJoined';
import { JoinProps } from '@/components/widgets/Join/types/JoinProps';
import { useMutation, useQuery } from '@apollo/client/react';

const useJoin = ({ event_id, user_id }: JoinProps) => {
  const [joinEventMutation] = useMutation(JOIN_MUTATION);
  const { data, refetch: refetchJoinedUsers } = useQuery<IGetJoined | null>(JOINED_BY_USERS, {
    variables: { eventId: event_id },
  });

  const { data: joinedByUser, refetch: refetchJoinedUser } = useQuery<{
    joinedByUser: IJoined | null;
  }>(JOINED_BY_USER, {
    variables: { eventId: event_id, userId: user_id },
  });

  const joinedUsers = data?.joinedByUsers.length;
  const isJoined = joinedByUser?.joinedByUser?.isJoined;

  const handleJoin = async () => {
    try {
      await joinEventMutation({
        variables: { eventId: event_id, userId: user_id },
        refetchQueries: [
          {
            query: GET_JOINED_EVENTS,
            variables: { userId: user_id },
          },
        ],
        awaitRefetchQueries: true,
      });
    } catch (error) {
      console.error('Error deleting event: ', error);
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
