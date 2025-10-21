import { useMutation } from "@apollo/client/react";

import { ACCEPT_INVITATION_MUTATION, DECLINE_INVITATION_MUTATION } from "@/app/api/graphql/mutations/invations";
import { GET_DECLINED_EVENTS } from "@/app/api/graphql/queries/invations";
import { GET_JOINED_EVENTS } from "@/app/api/graphql/queries/joined";
import { useNotifications } from "@/components/widgets/Notifications/hooks";

import { IUseInvitation } from "@/components/widgets/Invitation/types/Invitation";

export const useInvitation = ({ invitation_id, receiver_id }: IUseInvitation) => {
    const { refetchDataInvations } = useNotifications();

    const [AcceptInvation] = useMutation(ACCEPT_INVITATION_MUTATION, {
        refetchQueries: [
            { query: GET_DECLINED_EVENTS, variables: { userId: receiver_id } },
            { query: GET_JOINED_EVENTS, variables: { userId: receiver_id } },
        ],
    });

    const [DeclineInvitation] = useMutation(DECLINE_INVITATION_MUTATION, {
        refetchQueries: [
            { query: GET_DECLINED_EVENTS, variables: { userId: receiver_id } },
            { query: GET_JOINED_EVENTS, variables: { userId: receiver_id } },
        ],
    });

    const acceptInvation = async () => {
        try {
            await AcceptInvation({
                variables: { invitationId: invitation_id, userId: receiver_id },
            });
        } catch (error) {
            console.error("Error accepting invitation: ", error);
        }
        refetchDataInvations();
    };

    const declineInvitation = async () => {
        try {
            await DeclineInvitation({
                variables: { invitationId: invitation_id, userId: receiver_id },
            });
        } catch (error) {
            console.error("Error declining invitation: ", error);
        }
        refetchDataInvations();
    };

    return { acceptInvation, declineInvitation };
};
