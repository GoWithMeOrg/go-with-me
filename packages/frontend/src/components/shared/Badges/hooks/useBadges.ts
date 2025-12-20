import { useMemo } from 'react';

import classes from '../Badges.module.css';

export enum Sizes {
  NORMAL = 'normal',
  SMALL = 'small',
}

interface UseBadgesProps {
  badges: string[];
  size?: Sizes;
  className?: string;
  onDeleteBadge?: (updatedBadges: string[]) => void;
}

export const useBadges = ({ badges, size, className, onDeleteBadge }: UseBadgesProps) => {
  const badgeCssString = useMemo(
    () =>
      [classes.badge, size === Sizes.SMALL && classes.small, className].filter(Boolean).join(' '),
    [className, size]
  );

  const handleDeleteBadge = (badge: string) => {
    onDeleteBadge?.(badges.splice(badges.indexOf(badge), 1));
  };

  return {
    badgeCssString,
    handleDeleteBadge,
  };
};
