'use client';

import { FC } from 'react';
import { PrivacyVisibility } from '@/app/graphql/types';
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
        whoCanSeeEvents,
        setWhoCanSeeEvents,
        whoCanInviteToEvents,
        setWhoCanInviteToEvents,
        handleSave,
        companions,
    } = useConfidentiality();

    if (loading) return null;

    const companionList = companions.map(
        (c) => `${c.firstName} ${c.lastName}`,
    );
    const companionImages: Record<string, string> = {};
    for (const c of companions) {
        const name = `${c.firstName} ${c.lastName}`;
        if (c.image) companionImages[name] = c.image;
    }

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

                {whoCanSeeEvents === PrivacyVisibility.MarkedCompanions && (
                    <Dropdown
                        label="No list selected"
                        selectedLabel={(count) => `${count} companion${count > 1 ? 's' : ''}`}
                        categoriesData={[]}
                        list={companionList}
                        itemImages={companionImages}
                        filter={false}
                    />
                )}
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

                {whoCanInviteToEvents === PrivacyVisibility.MarkedCompanions && (
                    <Dropdown
                        label="No list selected"
                        selectedLabel={(count) => `${count} companion${count > 1 ? 's' : ''}`}
                        categoriesData={[]}
                        list={companionList}
                        itemImages={companionImages}
                        filter={false}
                    />
                )}
            </div>

            {isDirty && (
                <Button className={classes.saveButton} onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save changes'}
                </Button>
            )}
        </div>
    );
};
