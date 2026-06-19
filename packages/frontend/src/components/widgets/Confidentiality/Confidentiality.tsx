'use client';

import { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { GET_MY_PRIVACY_SETTING } from '@/app/graphql/queries/privacySetting';
import { UPDATE_PRIVACY_SETTING } from '@/app/graphql/mutations/privacySetting';
import { Button } from '@/components/shared/Button';
import { PrivacySelector } from '@/components/widgets/PrivacySelector';
import { PrivacyVisibility } from '@/app/graphql/types';

import classes from './Confidentiality.module.css';

const VISIBILITY_OPTIONS = [
    { key: 'Everyone', label: 'All users' },
    { key: 'Companions', label: 'My companions' },
    { key: 'MarkedCompanions', label: 'Marked companions' },
] as const;

const VISIBILITY_MAP: Record<string, string> = {
    Everyone: PrivacyVisibility.Everyone,
    Companions: PrivacyVisibility.Companions,
    MarkedCompanions: PrivacyVisibility.MarkedCompanions,
};

export const Confidentiality: FC = () => {
    const { data, loading } = useQuery(GET_MY_PRIVACY_SETTING);

    const [whoCanSeeEvents, setWhoCanSeeEvents] = useState<string | null>(null);
    const [whoCanInviteToEvents, setWhoCanInviteToEvents] = useState<string | null>(null);

    const [updatePrivacySetting, { loading: saving }] = useMutation(UPDATE_PRIVACY_SETTING, {
        refetchQueries: [{ query: GET_MY_PRIVACY_SETTING }],
    });

    if (loading) return null;

    const currentSee = whoCanSeeEvents ?? data?.myPrivacySetting?.whoCanSeeEvents ?? PrivacyVisibility.Everyone;
    const currentInvite = whoCanInviteToEvents ?? data?.myPrivacySetting?.whoCanInviteToEvents ?? PrivacyVisibility.Everyone;

    const isDirty =
        (whoCanSeeEvents !== null && whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents) ||
        (whoCanInviteToEvents !== null && whoCanInviteToEvents !== data?.myPrivacySetting?.whoCanInviteToEvents);

    const handleSave = async () => {
        const vars: { whoCanSeeEvents?: string; whoCanInviteToEvents?: string } = {};
        if (whoCanSeeEvents !== null && whoCanSeeEvents !== data?.myPrivacySetting?.whoCanSeeEvents) {
            vars.whoCanSeeEvents = whoCanSeeEvents;
        }
        if (whoCanInviteToEvents !== null && whoCanInviteToEvents !== data?.myPrivacySetting?.whoCanInviteToEvents) {
            vars.whoCanInviteToEvents = whoCanInviteToEvents;
        }
        await updatePrivacySetting({ variables: { input: vars } });
        setWhoCanSeeEvents(null);
        setWhoCanInviteToEvents(null);
    };

    return (
        <div className={classes.confidentiality}>
            <div className={classes.section}>
                <span className={classes.sectionTitle}>
                    Who can see the list of events I am going to attend?
                </span>
                <PrivacySelector
                    options={VISIBILITY_MAP}
                    privacyOptions={VISIBILITY_OPTIONS}
                    selected={currentSee}
                    onChange={(e) => setWhoCanSeeEvents(e.target.value)}
                />
            </div>

            <div className={classes.section}>
                <span className={classes.sectionTitle}>
                    Who can invite me to events?
                </span>
                <PrivacySelector
                    options={VISIBILITY_MAP}
                    privacyOptions={VISIBILITY_OPTIONS}
                    selected={currentInvite}
                    onChange={(e) => setWhoCanInviteToEvents(e.target.value)}
                />
            </div>

            {isDirty && (
                <Button className={classes.saveButton} onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save changes'}
                </Button>
            )}
        </div>
    );
};
