import {
    ACCEPT_COMPANION_REQUEST_MUTATION,
    REJECT_COMPANION_REQUEST_MUTATION,
} from '@/app/graphql/mutations/companionRequest';
import { useMutation } from '@apollo/client/react';

interface useCompanionRequestProps {
    request_id: string;
}

export const useCompanionRequest = ({ request_id }: useCompanionRequestProps) => {
    const [AcceptCompanionRequest] = useMutation(ACCEPT_COMPANION_REQUEST_MUTATION, {
        refetchQueries: ['GetCompanionRequests'],
        update: (cache) => {
            // После принятия заявки обновляем кэш компаньонов
            cache.evict({ fieldName: 'companionsByOwnerId' });
            cache.gc();
        },
    });

    const [RejectCompanionRequest] = useMutation(REJECT_COMPANION_REQUEST_MUTATION, {
        refetchQueries: ['GetCompanionRequests'],
    });

    const acceptRequest = async () => {
        try {
            await AcceptCompanionRequest({
                variables: { requestId: request_id },
            });
        } catch (error) {
            console.error('Error deleting event: ', error);
        }
    };

    const rejectRequest = async () => {
        try {
            await RejectCompanionRequest({
                variables: { requestId: request_id },
            });
        } catch (error) {
            console.error('Error deleting event: ', error);
        }
    };
    return { acceptRequest, rejectRequest };
};
