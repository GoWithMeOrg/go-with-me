import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ORGANIZER_EVENTS } from "@/app/api/graphql/queries/events";
import { GET_USER_BY_ID } from "@/app/api/graphql/queries/user";
import { COMPANION_REQUEST_MUTATION } from "@/app/api/graphql/mutations/companionRequest";

import { usePopup } from "@/components/shared/Popup/hooks";

export const usePublicProfile = () => {
    const { data: session, status } = useSession();
    const params = useParams();
    const user_id = session?.user.id;
    const isOwner = session?.user.id === params.user_id;

    const { data: userData } = useQuery(GET_USER_BY_ID, { variables: { userId: params.user_id } });
    const { data: eventsData } = useQuery(GET_ORGANIZER_EVENTS, {
        variables: { organizerId: params.user_id },
    });

    const popupMode: "auth" = "auth";

    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup } = usePopup({ popupMode });

    const [CompanionRequest] = useMutation(COMPANION_REQUEST_MUTATION);

    const companionRequest = async () => {
        try {
            await CompanionRequest({
                variables: { senderId: user_id, receiverId: params.user_id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return {
        user_id,
        userData,
        eventsData,
        status,
        isOwner,
        showPopup,
        setShowPopup,
        handleShowPopup,
        handleHidePopup,
        companionRequest,
    };
};
