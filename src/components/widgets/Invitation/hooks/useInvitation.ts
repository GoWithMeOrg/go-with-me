import { useMutation } from "@apollo/client";

import { ACCEPT_INVITATION_MUTATION, DECLINE_INVITATION_MUTATION } from "@/app/api/graphql/mutations/invations";
import { useNotifications } from "@/components/widgets/Notifications/hooks";

interface IUseInvitation {
    invitation_id: string;
    receiver_id: string;
}

export const useInvitation = ({ invitation_id, receiver_id }: IUseInvitation) => {
    const [AcceptInvation] = useMutation(ACCEPT_INVITATION_MUTATION);
    const [DeclineInvitation] = useMutation(DECLINE_INVITATION_MUTATION);
    const { refetchDataInvations } = useNotifications();

    const acceptInvation = async () => {
        try {
            await AcceptInvation({
                variables: { invitationId: invitation_id, userId: receiver_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetchDataInvations();
    };

    const declineInvitation = async () => {
        try {
            await DeclineInvitation({
                variables: { invitationId: invitation_id, userId: receiver_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
        refetchDataInvations();
    };
    return { acceptInvation, declineInvitation };
};
