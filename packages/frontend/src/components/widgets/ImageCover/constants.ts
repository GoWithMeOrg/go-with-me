import { SizeCard } from '../CardEvent/types';

import classes from '../CardEvent/CardEvent.module.css';

export const IMAGE_SIZES = {
    medium: { width: 440, height: 290 },
    'medium-large': { width: 380, height: 250 },
    large: { width: 350, height: 230 },
    'small-large': { width: 320, height: 210 },
    small: { width: 310, height: 200 },
} as const;

export type ImageSizeKey = keyof typeof IMAGE_SIZES;

export const SIZE_CLASS_MAP: Record<SizeCard, string> = {
    [SizeCard.M]: classes.medium,
    [SizeCard.ML]: classes.mediumLarge,
    [SizeCard.L]: classes.large,
    [SizeCard.SL]: classes.smallLarge,
    [SizeCard.S]: classes.small,
};
