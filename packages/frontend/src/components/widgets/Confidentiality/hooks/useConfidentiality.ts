'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { UPDATE_PRIVACY_SETTING } from '@/app/graphql/mutations/privacySetting';
import { GET_COMPANIONS_BY_OWNER_ID } from '@/app/graphql/queries/companions';
import { GET_MY_PRIVACY_SETTING } from '@/app/graphql/queries/privacySetting';
import { PrivacyVisibility } from '@/app/graphql/types';
import { useMutation, useQuery } from '@apollo/client/react';

export const useConfidentiality = () => {
    const { data, loading: privacyLoading } = useQuery(GET_MY_PRIVACY_SETTING);

    const { data: companionsData, loading: companionsLoading } = useQuery(GET_COMPANIONS_BY_OWNER_ID, {
        variables: { limit: 200, offset: 0 },
    });

    const loading = privacyLoading || companionsLoading;

    const [whoCanSeeEvents, setWhoCanSeeEvents] = useState<string | null>(null);
    const [whoCanInviteToEvents, setWhoCanInviteToEvents] = useState<string | null>(null);

    const [selectedSeeNames, setSelectedSeeNames] = useState<string[]>([]);
    const [selectedInviteNames, setSelectedInviteNames] = useState<string[]>([]);

    const [updatePrivacySetting, { loading: saving }] = useMutation(UPDATE_PRIVACY_SETTING, {
        refetchQueries: [{ query: GET_MY_PRIVACY_SETTING }],
    });

    const currentSee = whoCanSeeEvents ?? data?.myPrivacySetting?.whoCanSeeEvents ?? 'EVERYONE';
    const currentInvite =
        whoCanInviteToEvents ?? data?.myPrivacySetting?.whoCanInviteToEvents ?? 'EVERYONE';

    const companions = companionsData?.companionsByOwnerId?.companions ?? [];

    const companionList = useMemo(
        () => companions.map((c) => `${c.firstName} ${c.lastName}`),
        [companions],
    );
    const companionImages: Record<string, string> = {};
    for (const c of companions) {
        const name = `${c.firstName} ${c.lastName}`;
        if (c.image) companionImages[name] = c.image;
    }

    const companionIdByFullName: Record<string, string> = {};
    for (const c of companions) {
        companionIdByFullName[`${c.firstName} ${c.lastName}`] = c._id;
    }

    const markedById = useMemo(() => {
        const m = data?.myPrivacySetting;
        return {
            see: new Set(m?.markedForWhoCanSeeEvents ?? []),
            invite: new Set(m?.markedForWhoCanInviteToEvents ?? []),
        };
    }, [data]);

    const initialSeeNames = useMemo(
        () => companionList.filter((_, i) => markedById.see.has(companions[i]._id)),
        [companionList, markedById.see, companions],
    );
    const initialInviteNames = useMemo(
        () => companionList.filter((_, i) => markedById.invite.has(companions[i]._id)),
        [companionList, markedById.invite, companions],
    );

    useEffect(() => {
        if (!loading) {
            setSelectedSeeNames(initialSeeNames);
            setSelectedInviteNames(initialInviteNames);
        }
    }, [loading, initialSeeNames, initialInviteNames]);

    const handleSeeSelection = useCallback((names: string[]) => {
        setSelectedSeeNames(names);
    }, []);

    const handleInviteSelection = useCallback((names: string[]) => {
        setSelectedInviteNames(names);
    }, []);

    const isSeeDirty = whoCanSeeEvents !== null && whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents;
    const isInviteDirty = whoCanInviteToEvents !== null && whoCanInviteToEvents !== data?.myPrivacySetting?.whoCanInviteToEvents;
    const isSeeListDirty =
        JSON.stringify([...selectedSeeNames].sort()) !== JSON.stringify([...initialSeeNames].sort());
    const isInviteListDirty =
        JSON.stringify([...selectedInviteNames].sort()) !== JSON.stringify([...initialInviteNames].sort());

    const isDirty =
        isSeeDirty ||
        isInviteDirty ||
        (currentSee === PrivacyVisibility.MarkedCompanions && isSeeListDirty) ||
        (currentInvite === PrivacyVisibility.MarkedCompanions && isInviteListDirty);

    const handleSave = async () => {
        const vars: Record<string, unknown> = {};
        const prevSee = data?.myPrivacySetting?.whoCanSeeEvents;
        const prevInvite = data?.myPrivacySetting?.whoCanInviteToEvents;

        if (isSeeDirty) {
            vars.whoCanSeeEvents = whoCanSeeEvents;
        }
        if (isInviteDirty) {
            vars.whoCanInviteToEvents = whoCanInviteToEvents;
        }

        if (currentSee === PrivacyVisibility.MarkedCompanions && isSeeListDirty) {
            vars.markedForWhoCanSeeEvents = selectedSeeNames
                .map((name) => companionIdByFullName[name])
                .filter(Boolean);
        } else if (isSeeDirty && whoCanSeeEvents !== PrivacyVisibility.MarkedCompanions) {
            vars.markedForWhoCanSeeEvents = null;
        }

        if (currentInvite === PrivacyVisibility.MarkedCompanions && isInviteListDirty) {
            vars.markedForWhoCanInviteToEvents = selectedInviteNames
                .map((name) => companionIdByFullName[name])
                .filter(Boolean);
        } else if (isInviteDirty && whoCanInviteToEvents !== PrivacyVisibility.MarkedCompanions) {
            vars.markedForWhoCanInviteToEvents = null;
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
        companionList,
        companionImages,
        companionIdByFullName,
        selectedSeeNames,
        selectedInviteNames,
        handleSeeSelection,
        handleInviteSelection,
    };
};
