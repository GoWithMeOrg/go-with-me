import React, { FC, HTMLAttributes } from 'react';

import { useBadges } from './hooks';

import classes from './Badges.module.css';

interface IBadges extends HTMLAttributes<HTMLUListElement> {
  badges: string[];
  icon?: React.ReactNode;
  onDeleteBadge?: (badge: string[]) => void;
  size?: Sizes;
}

export enum Sizes {
  NORMAL = 'normal',
  SMALL = 'small',
}

export const Badges: FC<IBadges> = ({ onDeleteBadge, badges, icon, className, size }) => {
  const { badgeCssString, handleDeleteBadge } = useBadges({
    badges,
    size,
    className,
    onDeleteBadge,
  });

  return (
    <ul className={classes.badgeList}>
      {badges.map((badge) => (
        <li key={badge} className={badgeCssString}>
          {badge}
          <button type="button" onClick={() => handleDeleteBadge(badge)}>
            {icon}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Badges;
