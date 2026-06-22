'use client';

import { useState, useMemo, useCallback } from 'react';
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

    const [dirtySeeNames, setDirtySeeNames] = useState<string[] | null>(null);
    const [dirtyInviteNames, setDirtyInviteNames] = useState<string[] | null>(null);
    const [dropKeySee, setDropKeySee] = useState(0);
    const [dropKeyInvite, setDropKeyInvite] = useState(0);

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

    const markedSet = useMemo(() => {
        const m = data?.myPrivacySetting;
        return {
            see: new Set(m?.markedForWhoCanSeeEvents ?? []),
            invite: new Set(m?.markedForWhoCanInviteToEvents ?? []),
        };
    }, [data]);

    const initialSeeNames = useMemo(
        () => companionList.filter((_, i) => markedSet.see.has(companions[i]._id)),
        [companionList, markedSet.see, companions],
    );
    const initialInviteNames = useMemo(
        () => companionList.filter((_, i) => markedSet.invite.has(companions[i]._id)),
        [companionList, markedSet.invite, companions],
    );

    // Use server data when no local changes, otherwise use dirty state
    const selectedSeeNames = dirtySeeNames ?? initialSeeNames;
    const selectedInviteNames = dirtyInviteNames ?? initialInviteNames;

    const handleSeeSelection = useCallback((names: string[]) => {
        setDirtySeeNames(names);
    }, []);

    const handleInviteSelection = useCallback((names: string[]) => {
        setDirtyInviteNames(names);
    }, []);

    const isSeeDirty = whoCanSeeEvents !== null && whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents;
    const isInviteDirty = whoCanInviteToEvents !== null && whoCanInviteToEvents !== data?.myPrivacySetting?.whoCanInviteToEvents;

    const areListsEqual = (a: string[], b: string[]) =>
        a.length === b.length && a.every((v) => b.includes(v));

    const isSeeListDirty = dirtySeeNames !== null && !areListsEqual(initialSeeNames, dirtySeeNames);
    const isInviteListDirty = dirtyInviteNames !== null && !areListsEqual(initialInviteNames, dirtyInviteNames);

    const isDirty =
        isSeeDirty ||
        isInviteDirty ||
        (currentSee === PrivacyVisibility.MarkedCompanions && isSeeListDirty) ||
        (currentInvite === PrivacyVisibility.MarkedCompanions && isInviteListDirty);

    const handleSave = async () => {
        const vars: Record<string, unknown> = {};

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
        setDirtySeeNames(null);
        setDirtyInviteNames(null);
        setDropKeySee((k) => k + 1);
        setDropKeyInvite((k) => k + 1);
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
        dropKeySee,
        dropKeyInvite,
        handleSeeSelection,
        handleInviteSelection,
    };
};
