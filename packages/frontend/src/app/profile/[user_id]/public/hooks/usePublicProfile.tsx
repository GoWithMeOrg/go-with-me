import { SEND_REQUEST_COMPANION_MUTATION } from '@/app/graphql/mutations/companionRequest';
import { GET_IS_USER_COMPANION } from '@/app/graphql/queries/companions';
import { GET_EVENTS_BY_ORGANIZER } from '@/app/graphql/queries/events';
import { GET_PRIVACY_SETTING_BY_USER_ID } from '@/app/graphql/queries/privacySetting';
import { GET_USER_BY_ID } from '@/app/graphql/queries/user';
import { PrivacySetting } from '@/app/graphql/types';
import { useDialogModal } from '@/components/widgets/DialogModal/hooks/useDialogModal';
import { useUserID } from '@/hooks/useUserID';
import { useMutation, useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

export const usePublicProfile = () => {
    const { user_id, status } = useUserID();
    const params = useParams();

    const isOwner = user_id === params.user_id;

    const isAuth = status === 'authenticated';

    const { data: userData } = useQuery(GET_USER_BY_ID, { variables: { userId: params.user_id } });
    const { data: eventsData } = useQuery(GET_EVENTS_BY_ORGANIZER, {
        variables: { organizerId: params.user_id },
    });

    const { data: isCompanionData } = useQuery(GET_IS_USER_COMPANION, {
        variables: { userId: user_id, companionId: params.user_id },
        skip: !isAuth || isOwner,
    });

    const { data: viewedUserPrivacy } = useQuery(GET_PRIVACY_SETTING_BY_USER_ID, {
        variables: { userId: params.user_id },
        skip: !isAuth || isOwner,
    });

    const userCompanion = (isCompanionData as { isUserCompanion: boolean })?.isUserCompanion ?? false;

    const canInvite = (() => {
        if (isOwner || !isAuth) return false;

        const settings: PrivacySetting | undefined = (
            viewedUserPrivacy as
                | { privacySettingByUserId: PrivacySetting }
                | undefined
        )?.privacySettingByUserId;

        if (!settings) return true; // пока не загрузилось — показываем, чтобы не моргало

        if (settings.whoCanInviteToEvents === 'EVERYONE') return true;
        if (settings.whoCanInviteToEvents === 'COMPANIONS') return userCompanion;
        if (settings.whoCanInviteToEvents === 'MARKED_COMPANIONS') {
            return (
                settings.markedForWhoCanInviteToEvents?.includes(user_id ?? '') ?? false
            );
        }
        return false;
    })();

    const [CompanionRequest] = useMutation(SEND_REQUEST_COMPANION_MUTATION);

    const popupsHook = useDialogModal({
        receiver_ids: [(userData as { user: { _id: string } })?.user?._id],
    });

    const companionRequest = async () => {
        try {
            await CompanionRequest({
                variables: { receiver: params.user_id },
            });
        } catch (error) {
            console.error('Error deleting event: ', error);
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
        canInvite,

        state: popupsHook.state,
    };
};
