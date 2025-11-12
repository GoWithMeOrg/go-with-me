import {
  ACCEPT_COMPANION_MUTATION,
  REJECT_COMPANION_MUTATION,
} from '@/app/api/graphql/mutations/companionRequest';
import { useNotifications } from '@/components/widgets/Notifications/hooks';
import { useMutation } from '@apollo/client/react';

interface useApplicationProps {
  id: string;
}

export const useApplication = ({ id }: useApplicationProps) => {
  const { refetch } = useNotifications();
  const [AcceptCompanionRequest] = useMutation(ACCEPT_COMPANION_MUTATION);
  const [RejectCompanionRequest] = useMutation(REJECT_COMPANION_MUTATION);

  const acceptRequest = async () => {
    try {
      await AcceptCompanionRequest({
        variables: { requestId: id },
      });

      refetch();
    } catch (error) {
      console.error('Error deleting event: ', error);
    }
  };

  const rejectRequest = async () => {
    try {
      await RejectCompanionRequest({
        variables: { requestId: id },
      });

      refetch();
    } catch (error) {
      console.error('Error deleting event: ', error);
    }
  };
  return { acceptRequest, rejectRequest };
};
