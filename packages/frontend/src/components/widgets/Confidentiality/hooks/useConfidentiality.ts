'use client';

import { useState } from 'react';
import { UPDATE_PRIVACY_SETTING } from '@/app/graphql/mutations/privacySetting';
import { GET_COMPANIONS_BY_OWNER_ID } from '@/app/graphql/queries/companions';
import { GET_MY_PRIVACY_SETTING } from '@/app/graphql/queries/privacySetting';
import { useMutation, useQuery } from '@apollo/client/react';

export const useConfidentiality = () => {
    const { data, loading } = useQuery(GET_MY_PRIVACY_SETTING);

    const { data: companionsData } = useQuery(GET_COMPANIONS_BY_OWNER_ID, {
        variables: { limit: 200, offset: 0 },
    });

    const [whoCanSeeEvents, setWhoCanSeeEvents] = useState<string | null>(null);
    const [whoCanInviteToEvents, setWhoCanInviteToEvents] = useState<string | null>(null);

    const [updatePrivacySetting, { loading: saving }] = useMutation(UPDATE_PRIVACY_SETTING, {
        refetchQueries: [{ query: GET_MY_PRIVACY_SETTING }],
    });

    const currentSee = whoCanSeeEvents ?? data?.myPrivacySetting?.whoCanSeeEvents ?? 'EVERYONE';
    const currentInvite =
        whoCanInviteToEvents ?? data?.myPrivacySetting?.whoCanInviteToEvents ?? 'EVERYONE';

    const companions = companionsData?.companionsByOwnerId?.companions ?? [];

    const isDirty =
        (whoCanSeeEvents !== null && whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents) ||
        (whoCanInviteToEvents !== null &&
            whoCanInviteToEvents !== data?.myPrivacySetting?.whoCanInviteToEvents);

    const handleSave = async () => {
        const vars: {
            whoCanSeeEvents?: string;
            whoCanInviteToEvents?: string;
        } = {};
        if (
            whoCanSeeEvents !== null &&
            whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents
        ) {
            vars.whoCanSeeEvents = whoCanSeeEvents;
        }
        if (
            whoCanInviteToEvents !== null &&
            whoCanInviteToEvents !== data?.myPrivacySetting?.whoCanInviteToEvents
        ) {
            vars.whoCanInviteToEvents = whoCanInviteToEvents;
        }
        await updatePrivacySetting({ variables: { input: vars } });
        setWhoCanSeeEvents(null);
        setWhoCanInviteToEvents(null);
    };

    return {
        loading,
        saving,
        currentSee,
        currentInvite,
        isDirty,
        whoCanSeeEvents,
        setWhoCanSeeEvents,
        whoCanInviteToEvents,
        setWhoCanInviteToEvents,
        handleSave,
        companions,
    };
};
