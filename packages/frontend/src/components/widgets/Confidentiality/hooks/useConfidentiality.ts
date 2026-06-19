'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { GET_MY_PRIVACY_SETTING } from '@/app/graphql/queries/privacySetting';
import { UPDATE_PRIVACY_SETTING } from '@/app/graphql/mutations/privacySetting';
import type { PrivacySetting } from '@/app/graphql/types';

export const useConfidentiality = () => {
    const { data, loading } = useQuery<{ myPrivacySetting: PrivacySetting }>(
        GET_MY_PRIVACY_SETTING,
    );

    const [whoCanSeeEvents, setWhoCanSeeEvents] = useState<string | null>(null);
    const [whoCanInviteToEvents, setWhoCanInviteToEvents] = useState<string | null>(null);

    const [updatePrivacySetting, { loading: saving }] = useMutation(
        UPDATE_PRIVACY_SETTING,
        {
            refetchQueries: [{ query: GET_MY_PRIVACY_SETTING }],
        },
    );

    const currentSee =
        whoCanSeeEvents ??
        data?.myPrivacySetting?.whoCanSeeEvents ??
        'EVERYONE';
    const currentInvite =
        whoCanInviteToEvents ??
        data?.myPrivacySetting?.whoCanInviteToEvents ??
        'EVERYONE';

    const isDirty =
        (whoCanSeeEvents !== null &&
            whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents) ||
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
        setWhoCanSeeEvents,
        setWhoCanInviteToEvents,
        handleSave,
    };
};
