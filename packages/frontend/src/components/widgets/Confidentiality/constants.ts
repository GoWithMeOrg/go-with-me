import { PrivacyVisibility } from '@/app/graphql/types';

export const VISIBILITY_OPTIONS = [
    { key: 'Everyone', label: 'All users' },
    { key: 'Companions', label: 'My companions' },
    { key: 'MarkedCompanions', label: 'Marked companions' },
] as const;

export const VISIBILITY_MAP: Record<string, string> = {
    Everyone: PrivacyVisibility.Everyone,
    Companions: PrivacyVisibility.Companions,
    MarkedCompanions: PrivacyVisibility.MarkedCompanions,
};
