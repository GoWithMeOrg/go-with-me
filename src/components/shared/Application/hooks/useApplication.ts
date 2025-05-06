import { ACCEPT_COMPANION_MUTATION, REJECT_COMPANION_MUTATION } from "@/app/api/graphql/mutations/companionRequest";
import { useMutation } from "@apollo/client";

interface useApplicationProps {
    id: string;
}

export const useApplication = ({ id }: useApplicationProps) => {
    const [AcceptCompanionRequest] = useMutation(ACCEPT_COMPANION_MUTATION);
    const [RejectCompanionRequest] = useMutation(REJECT_COMPANION_MUTATION);

    const acceptRequest = async () => {
        try {
            await AcceptCompanionRequest({
                variables: { requestId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const rejectRequest = async () => {
        try {
            await RejectCompanionRequest({
                variables: { requestId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };
    return { acceptRequest, rejectRequest };
};
