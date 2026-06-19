'use client';

import { FC } from 'react';
import { Button } from '@/components/shared/Button';
import { Dropdown } from '@/components/shared/Dropdown';
import { Span } from '@/components/shared/Span';
import { PrivacySelector } from '@/components/widgets/PrivacySelector';

import { VISIBILITY_MAP, VISIBILITY_OPTIONS } from './constants';
import { useConfidentiality } from './hooks/useConfidentiality';

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
                <Span title="Who can see the list of events I am going to attend?" />
                <PrivacySelector
                    name="whoCanSeeEvents"
                    wrapperClassName={classes.vertical}
                    options={VISIBILITY_MAP}
                    privacyOptions={VISIBILITY_OPTIONS}
                    selected={currentSee}
                    onChange={(e) => setWhoCanSeeEvents(e.target.value)}
                />
                <Dropdown categoriesData={[]} list={[]} filter={false} />
            </div>

            <div className={classes.section}>
                <Span title="Who can invite me to events?" />

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
