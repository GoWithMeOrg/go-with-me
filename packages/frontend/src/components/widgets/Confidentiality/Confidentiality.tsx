'use client';

import { FC } from 'react';

import { Button } from '@/components/shared/Button';
import { PrivacySelector } from '@/components/widgets/PrivacySelector';

import { useConfidentiality } from './hooks/useConfidentiality';
import { VISIBILITY_MAP, VISIBILITY_OPTIONS } from './constants';

import classes from './Confidentiality.module.css';

export const Confidentiality: FC = () => {
    const {
        loading,
        saving,
        currentSee,
        currentInvite,
        isDirty,
        setWhoCanSeeEvents,
        setWhoCanInviteToEvents,
        handleSave,
    } = useConfidentiality();

    if (loading) return null;

    return (
        <div className={classes.confidentiality}>
            <div className={classes.section}>
                <span className={classes.sectionTitle}>
                    Who can see the list of events I am going to attend?
                </span>
                <PrivacySelector
                    name="whoCanSeeEvents"
                    wrapperClassName={classes.vertical}
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
                    name="whoCanInviteToEvents"
                    wrapperClassName={classes.vertical}
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
