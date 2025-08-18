import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";
import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { COMPANION_REQUEST_MUTATION } from "@/app/api/graphql/mutations/companionRequest";
import { useUserID } from "@/hooks/useUserID";
import { useDialogModal } from "@/components/widgets/DialogModal/hooks/useDialogModal";
import { GET_IS_USER_COMPANION } from "@/app/api/graphql/queries/companions";

export const usePublicProfile = () => {
    const { user_id, status } = useUserID();
    const params = useParams();

    const isOwner = user_id === params.user_id;

    const { data: userData } = useQuery(GET_USER_BY_ID, { variables: { userId: params.user_id } });
    const { data: eventsData } = useQuery(GET_ORGANIZER_EVENTS, {
        variables: { organizerId: params.user_id },
    });

    const { data: isCompanion } = useQuery(GET_IS_USER_COMPANION, {
        variables: { userId: user_id, companionId: params.user_id },
    });

    const userCompanion = isCompanion?.isUserCompanion;

    const [CompanionRequest] = useMutation(COMPANION_REQUEST_MUTATION);

    const popupsHook = useDialogModal({ receiver_ids: userData?.user?._id });

    const companionRequest = async () => {
        try {
            await CompanionRequest({
                variables: { senderId: user_id, receiverId: params.user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }

        popupsHook.closePopup();
    };

    return {
        user_id,
        userData,
        eventsData,
        status,
        isOwner,
        showPopup: popupsHook.showPopup,
        refPopup: popupsHook.refPopup,
        popupCss: popupsHook.popupCss,
        openPopup: popupsHook.openPopup,
        closePopup: popupsHook.closePopup,
        handleHidePopup: popupsHook.handleHidePopup,
        sendInvation: popupsHook.sendInvation,
        handleSelectEvent: popupsHook.handleSelectEvent,
        events: popupsHook.events,
        openPopupRequestUser: popupsHook.openPopupRequestUser,
        openPopupInvitationCompanion: popupsHook.openPopupInvitationCompanion,

        companionRequest,
        userCompanion,

        state: popupsHook.state,
    };
};
